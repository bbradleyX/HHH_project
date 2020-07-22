import React from "react"
import {Dropdown, Button} from 'react-bootstrap'
import Header from "../components/Header";
import AddLogForm from "../components/AddLogForm";
import "../css/pals.css"
class AddLogPage extends React.Component {
  

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
          <Header name={name} imageUrl={profileImageURL}/>
          <div className="container">
            <h1>AddLog</h1>
            <AddLogForm />
          </div>
        </>
    )
  }
  
}

export default AddLogPage;