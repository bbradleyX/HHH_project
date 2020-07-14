import React from "react";
import {Dropdown, Button} from 'react-bootstrap';
import Header from "../components/Header";
import PalContainer from "../components/PalContainer";
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
                notes="Met at InternHacks summer event, senior computer science student. Working on 
                the infrastructure/backend of our project."
            />
            <PalContainer 
                name="Camelia Betancourt" 
                type="Friends" 
                frequency="Every Week" 
                notes="Met at InternHacks summer event, senior design student. Likes to cook a lot 
                and is working on the design portions of our project."
            />
            <PalContainer 
                name="Diego Corterno"
                type="Friends"
                frequency="Every Week"
                notes="Met at InternHacks summer event, senior computer engineering student. The PM
                 of our project."
            />
            <PalContainer
                name="Meri Kavtelishvili"
                type="Friends" 
                frequency="Every Week" 
                notes="Met at InternHacks summer event, senior computer science student. Working on 
                the infrastructure/backend of our project."
            />
            <PalContainer 
                name="Suprada Urval" 
                type="Professional" 
                frequency="Every Week" 
                notes="Met at InternHacks summer event, UI engineer at Netflix. Mentor of our group."
            />
        </ul>
        
      </>
  )
}

export default Pals;