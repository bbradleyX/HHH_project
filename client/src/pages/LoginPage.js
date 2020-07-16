import React from "react";
import LoginButton from "../components/LoginButton"
import "../css/login.css"
import logo from "../image/child_care.png"
class LoginPage extends React.Component {

    componentDidMount () {
      window.gapi.load('signin2', () => {
            window.gapi.signin2.render('login-button')
      })
    }
  
    render() {
      return (
        <>
          <div id="login-box" className="container">
            <li><img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="User Profile Image"
            />
            <span className="project-name login-project-name">PAL CHECK</span>
            
            </li>
            <div id="login-button" className="login-button-placement"></div>
          </div>
          
        </>
      )
    }
  }

export default LoginPage;