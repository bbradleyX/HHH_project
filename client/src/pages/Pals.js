import React from "react";
import {Dropdown, Button} from 'react-bootstrap';
import Header from "../components/Header";
import PalContainer from "../components/PalContainer";
import "../css/pals.css"
function Pals() {
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
        <ul className="pals-list container">
            <h1 className="heading">Take a look at all your Pals!</h1>
            <PalContainer 
                name="Bria Bradley"
                type="Friends" 
                frequency="Every Week" 
            />
            <PalContainer 
                name="Camelia Betancourt" 
                type="Friends" 
                frequency="Every Week"
            />
            <PalContainer 
                name="Diego Corterno"
                type="Friends"
                frequency="Every Week"
            />
            <PalContainer
                name="Meri Kavtelishvili"
                type="Friends" 
                frequency="Every Week" 
            />
            <PalContainer 
                name="Suprada Urval" 
                type="Professional" 
                frequency="Every Week" 
            />
        </ul>
        
      </>
  )
}

export default Pals;