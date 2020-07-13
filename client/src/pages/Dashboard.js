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
    const profileImageURL = profile.getImageUrl();
    const firstName = profile.getGivenName()
    const id = profile.getId()
    return (
        <>
          <Header name={name} imageUrl={profileImageURL} />
          <ul className="dash-list container">
              <h1 className="heading">Welcome {firstName}! What would you like to do today?</h1>
              <li className="dash-item">
                  <h2>Journal</h2>
              </li>
              <li className="dash-item" onClick={() => {window.location = "/pals";}}>
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