import React from "react"
import Header from "../components/Header";
import "../css/dash.css"
import Dashcard from "../components/Dashcard.js"
import Popcard from "../components/Popcard.js"
import Popup from "../components/Popup.js"
import { Link } from "react-router-dom";
import { render } from "react-dom";
import book from "../image/book.png";
import pencil from "../image/pencil.png";
import piechart from "../image/piechart.png";
import shaker from "../image/shaker.png";
import axios from 'axios'
class Dashboard extends React.Component {

  constructor(props){
    super(props);

    const authInstance = window.gapi.auth2.getAuthInstance()
    const user = authInstance.currentUser.get()
    const profile = user.getBasicProfile()
    const id = profile.getId()

    this.state = {
        id: id,
        modalShow: false,
        random_pal_name: '',
        random_pal_last_name: '',
        random_pal_category: '',
        no_friends: true
    }  
}

  goToPals() {
        window.location = "/pals";
  }

  getRandomPal() {
    console.log('id is ' + this.state.id)
    axios.get('http://localhost:3001/api/shake?id=' + this.state.id)
      .then(response => { 
        if (response.data.name)
        this.setState({no_friends: false})
        this.setState({random_pal_name: response.data.name,
                       random_pal_last_name: response.data.last_name,
                       random_pal_category: response.data.random_pal_category})
      })
      .catch((err) => {
        //To Do:
        //Error Handling!!
        console.log(err)
      })
  }

  render() {
    const authInstance = window.gapi.auth2.getAuthInstance()
    const user = authInstance.currentUser.get()
    const profile = user.getBasicProfile()
    const email = profile.getEmail()
    const name = profile.getName()
    const profileImageURL = profile.getImageUrl();
    const firstName = profile.getGivenName()
    const id = profile.getId()
    return (
        <>
          <Header name={name} imageUrl={profileImageURL} />
          <ul className="dash-list container">
              <h1 className="heading">Welcome {firstName}! What would you like to do today?</h1>
              <Dashcard type="dash-item journal-card"
                title="Journal" route="#journal" 
                imageSrc={pencil} imageWidth="74" imageHeight="115"
                description="Fill in the progress of your conversations."
              />
              <Dashcard type="dash-item pals-card"
                title="Pals" route="/pals" 
                imageSrc={book} imageWidth="105" imageHeight="111"
                description="Check out, add, and subtract from your pal book."
              />
              <Dashcard type="dash-item overview-card"
                title="Overview" route="#overview" 
                imageSrc={piechart} imageWidth="115" imageHeight="115"
                description="View and update your goals’ progress."
              />
              <Popcard type="dash-item shaker-card" 
                onClick={() => {
                  this.setState({modalShow: true})
                  this.getRandomPal()
                  }
                }
                 title="Shaker" route="#shaker"
                 imageSrc={shaker} imageWidth="109" imageHeight="122"
                 description="Connect randomnly with a pal in a matter of seconds."
              />
              <Popup
                      show={this.state.modalShow}
                      onHide={() => this.setState({modalShow: false})}
                      name={this.state.random_pal_name}
                      last_name={this.state.random_pal_last_name}
                      category={this.state.random_pal_category}
                      no_friends={this.state.no_friends}
              />
  
          </ul>
        </>
    )
  }
}

export default Dashboard;