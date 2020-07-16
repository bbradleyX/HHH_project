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
            <h4 className="pal-type-header heading friends-header">Friends</h4>
            <PalContainer
                palID="1"
                route="/pals/1" 
                name="Bria Bradley"
                type="Friends" 
                frequency="Every Week" 
            />
            <PalContainer
                palID="2"
                route="/pals/2" 
                name="Camelia Betancourt" 
                type="Friends" 
                frequency="Every Week"
            />
            <PalContainer
                palID="3"
                route="/pals/3" 
                name="Diego Corterno"
                type="Friends"
                frequency="Every Week"
            />
            <PalContainer
                palID="4"
                route="/pals/4"
                name="Meri Kavtelishvili"
                type="Friends" 
                frequency="Every Week" 
            />
            <h4 className="pal-type-header heading family-header">Family</h4>
            <PalContainer 
                palID="5"
                route="/pals/5" 
                name="Jaylene Trujillo" 
                type="Family" 
                frequency="Every Two Days" 
            />
            <h4 className="pal-type-header heading professional-header">Professional</h4>
            <PalContainer
                palID="6"
                route="/pals/6"  
                name="Suprada Urval" 
                type="Professional" 
                frequency="Every Week" 
            />
        </ul>
        
      </>
  )
}

export default Pals;