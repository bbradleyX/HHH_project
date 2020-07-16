import React from "react";
import {Dropdown, Button} from 'react-bootstrap';
import Header from "../components/Header";
import PalContainer from "../components/PalContainer";
import "../css/pals.css"
import { useParams } from "react-router-dom";
function PalView() {
  const authInstance = window.gapi.auth2.getAuthInstance()
  const user = authInstance.currentUser.get()
  const profile = user.getBasicProfile()
  const email = profile.getEmail()
  const name = profile.getName()
  const profileImageURL = profile.getImageUrl();
  const firstName = profile.getGivenName()
  const id = profile.getId()
  let {palID} = useParams();
  return (
      <>
        <Header name={name} imageUrl={profileImageURL} />
        
        <div className="pals-list container">
            
            <h1 className="heading">Pal View: {palID}</h1>
            <h4 className="pal-type-header heading friends-header">Friends</h4>
            
        </div>
        
      </>
  )
}

export default PalView;