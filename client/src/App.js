import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import './App.css'; 
import {Dropdown, Button} from 'react-bootstrap'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import Pals from './pages/Pals'


//this will be a Dashboard page 
//TO DO: figure out how to make a separate page and import here
//To Do: change hardcoded name with my name

class App extends React.Component{
  constructor(props) {
    super(props)

    //tracks the state of wether or not the user is signed in
    this.state = {
      isSignedIn: null
    }
  }

  //if user is signed in, renders Component, otherwise, renders LogInPage
  ifUserSignedIn(Component) {
    if (this.state.isSignedIn === null) {
      return (
          <h4>checking if you are signed in...</h4> 
        )
    }
    return this.state.isSignedIn ?
      <Component/> :
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

//initializes google authorization API and loads a Google sign-in button
    initializeGoogleSignIn () {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '337302123458-qhagbkm42i1k1mhrcv8qd9khorn5p7mb.apps.googleusercontent.com'
        }).then (() => {
          const authInstance = window.gapi.auth2.
          getAuthInstance()
          const isSignedIn = authInstance.isSignedIn.get()
          this.setState({isSignedIn})

          authInstance.isSignedIn.listen(isSignedIn => {
            this.setState({isSignedIn})
          })
        })
        console.log("API inited")
      })
    }
  

  render() {
    return (
     <BrowserRouter>
        <Switch>
        <Route path="/pals" render={() =>
          this.ifUserSignedIn(Pals)}/>
        <Route path="/" render={() => 
          this.ifUserSignedIn(Dashboard)}/>
        <Route exact path="/pals" component={Pals} />
        
        </Switch>
        
     </BrowserRouter>
    )
  }
}

export default App;
