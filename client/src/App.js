import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{

  componentDidMount() {
      console.log('Loading')
      this.insertGapiScript();

  }

//dynamically inserts the google API script into index.html and then calls 
//initializeGoogleSignIn function
    insertGapiScript() {
      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/platform.js'
      script.onload = () => {
        this.initializeGoogleSignIn();
      }
      document.body.appendChild(script)
    }

//initializes google authorization API and loads a Google sign-in button
    initializeGoogleSignIn () {

      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '337302123458-qhagbkm42i1k1mhrcv8qd9khorn5p7mb.apps.googleusercontent.com'
        })
        console.log("API inited")

        //defines what should happen if the user successfully signs in
        window.gapi.load('signin2', () => {
          const params = {
            onsuccess: () => {
              //maybe render the main page
              //and pass in the parameters to the backend server
              console.log('user signed in ------------------------------------')
            }
          }
          window.gapi.signin2.render('loginButton', params)
        })
      })
    }
  

  render() {
    return (
      <div className="App">
        <h1>PalCheck Log-In</h1>
        <div id="loginButton"></div>
      </div>
    );
  }
}

export default App;
