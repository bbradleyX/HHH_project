import React from "react"
import Header from "../components/Header";
import "../css/dash.css"
import Dashcard from "../components/Dashcard.js"
import book from "../image/book.png";
import pencil from "../image/pencil.png";
import piechart from "../image/piechart.png";
import shaker from "../image/shaker.png";
class Dashboard extends React.Component {
  goToPals() {
        window.location = "/pals";
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
                title="Journal" route="/journal" 
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
              <Dashcard type="dash-item shaker-card"
                title="Shaker" route="#shaker"
                 imageSrc={shaker} imageWidth="109" imageHeight="122"
                 description="Connect randomnly with a pal in a matter of seconds."
              />
  
          </ul>
        </>
    )
  }
  
}

export default Dashboard;