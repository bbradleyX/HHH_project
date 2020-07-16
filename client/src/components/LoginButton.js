import React from 'react'
import '../App.css'

class LoginButton extends React.Component {
    insertGapiScript() {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js'
      script.onload = () => {
        this.initalizeGoogleSignIn()
      }
      document.body.appendChild(script)
    } 

    onSuccess(googleUser) {
      console.log('why does nothiiiiiiiiiiing fucking gets logggggggeeeeeeeeeed u stupid ass bitch')
      console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    }

    initalizeGoogleSignIn() {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '506311073954-nibfptr95dccf4ftinu1jhkcr2540jr2.apps.googleusercontent.com'
        })
        console.log('Api inited')
        window.gapi.load('signin2', () => {
          const params = {
            'onsuccess': this.onSuccess
          }
          window.gapi.signin2.render('loginButton', {
            'onsuccess': this.onSuccess
          })
        })
      })
    }
  
    componentDidMount() {
      console.log('loading')
      this.insertGapiScript();
    }
    
    render() {
      return (
        
        <div id="loginButton" className="container"></div>
        
      );
    }
   
  }
  
  export default LoginButton;