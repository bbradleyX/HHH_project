import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import './App.css'; 
import axios from 'axios'
import {Dropdown, Button} from 'react-bootstrap'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import Pals from './pages/Pals'
import PalView from './pages/Palview'

class App extends React.Component{
  constructor(props) {
    super(props)

    //tracks the state of wether or not the user is signed in
    this.state = {
      isSignedIn: null
    }
  }

  //if user is signed in, renders Component, otherwise, renders LogInPage
  ifUserSignedIn(Component, props) {
    if (this.state.isSignedIn === null) {
      return (
          <h4>checking if you are signed in...</h4> 
        )
    }
    return this.state.isSignedIn ?
      <Component p={props}/> :
      <LoginPage isSignedIn={this.state.isSignedIn}/>
  }

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


    signOut() {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }
   

    //once the user signs-in, will send a post request to the server 
    //if server authenticates, will creatre a new user if one does not already exists
    //else, should return to the log-In page
    onSignIn(){
      const authInstance = window.gapi.auth2.getAuthInstance()
      const user = authInstance.currentUser.get()
      var id_token = user.getAuthResponse().id_token;
      const idToken = {
        id_token: id_token
      }
      axios.post('http://localhost:3001/api/auth', idToken)
      .then(response => console.log(response.data))
      .catch((err) => {
        console.log(err)
        //state of logged in is false
        //log out and redirect to the loginpage
        //pop up an error message 
        this.signOut()
        this.setState({isSignedIn: false})
        return(<LoginPage isSignedIn={this.state.isSignedIn}/>)


      })
    }

//initializes google authorization API and loads a Google sign-in button
    initializeGoogleSignIn () {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '337302123458-qhagbkm42i1k1mhrcv8qd9khorn5p7mb.apps.googleusercontent.com'
        }).then (() => {
          const authInstance = window.gapi.auth2.getAuthInstance()
          const isSignedIn = authInstance.isSignedIn.get()
          this.setState({isSignedIn})

          authInstance.isSignedIn.listen((isSignedIn) => {
            this.setState({isSignedIn})
            if (isSignedIn){
              this.onSignIn()
            }
          })
        })
        console.log("API inited")
      })
    }
  

  render() {
    return (
     <BrowserRouter>
      <div className="App">
        <Switch>
        
        <Route path="/pals/:palID" render={() => 
          this.ifUserSignedIn(PalView)}/>
        {/* <Route path="/pals/:palID" children={<PalView />} /> */}
        <Route path="/pals" render={() =>
          this.ifUserSignedIn(Pals)}/>
        <Route path="/" render={() => 
          this.ifUserSignedIn(Dashboard)}/>
        
        </Switch>
      </div>
     </BrowserRouter>
    )
  }
}

export default App;
