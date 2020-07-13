import React from "react";
import LoginButton from "../components/LoginButton"
class LoginPage extends React.Component {

    componentDidMount () {
      window.gapi.load('signin2', () => {
            window.gapi.signin2.render('login-button')
      })
    }
  
    render() {
      return (
        <>
          <h2>Sign in to see the dashboard</h2>
          <div id="login-button"></div>
        </>
      )
    }
  }

export default LoginPage;