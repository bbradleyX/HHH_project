import React from "react"
import {Dropdown, Button} from 'react-bootstrap'
import Header from "../components/Header";
function Pals() {
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
        <h2>Pals!</h2>
        <ul className="pals-list">
            <li className="pal">
                <h2>Bria Bradley</h2>
            </li>
            <li className="pal">
                <h2>Camelia Betancourt</h2>
            </li>
            <li className="pal">
                <h2>Diego Corterno</h2>
            </li>
            <li className="pal">
                <h2>Meri Kavtelishvili</h2>
            </li>
            <li className="pal">
                <h2>Suprada Urval</h2>
            </li>
        </ul>
      </>
  )
}

export default Pals;