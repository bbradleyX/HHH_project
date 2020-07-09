import React from "react"
import {Dropdown, Button} from 'react-bootstrap'
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { render } from "react-dom";
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
    const firstName = profile.getGivenName()
    const id = profile.getId()
    return (
        <>
          <Header name={name}/>
          <h2>Welcome {firstName}!</h2>
          <ul className="cards container">
              
              <li className="dash-item">
                  <h2>Log Book</h2>
              </li>
              <li className="dash-item" onClick={this.goToPals}>
                  <h2>Pals</h2>
                  
              </li>
              <li className="dash-item">
                  <h2>Overview</h2>
              </li>
              <li className="dash-item">
                  <h2>Shaker</h2>
              </li>
  
          </ul>
        </>
    )
  }
  
}

export default Dashboard;