import React from "react";
import {Dropdown, Button} from 'react-bootstrap';
import Header from "../components/Header";
import PalContainer from "../components/PalContainer";
import "../css/pals.css"
import Axios from "axios";
class Pals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            name: window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName(),
            profileImageURL: window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getImageUrl(),
            
            id: window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId(),
            palsList: []
        }
        const authInstance = window.gapi.auth2.getAuthInstance()
        const user = authInstance.currentUser.get()
        const profile = user.getBasicProfile()
        const email = profile.getEmail()
        const name = profile.getName()
        const profileImageURL = profile.getImageUrl();
        const firstName = profile.getGivenName()
        const id = profile.getId()
    }
    
    componentDidMount() {
        Axios.get('http://localhost:3001/api/getContacts?id=' + this.state.id, this.state)
        .then(response => {
            this.setState({
                data: response.data
            });
            console.log(this.state.data)
        })
    }

    render() {
        const freq = ["Every Day", "Every 3 Days", "Every Week", "Every 2 Weeks", "Every 3 Weeks", "Every Month", "Every 2 Months"]
        const list = this.state.data.map((pal, i) => {
            
            return(
                <div>
                    <PalContainer
                        palID={pal._id}
                        key={i}
                        route={"/pals/" + pal._id}
                        name={pal.name + " "+ pal.last_name}
                        type={pal.category}
                        frequency={freq[parseInt(pal.frequency) - 1]}
                    />
                </div>
            )
            
        })
        
        
        console.log(this.state.palsList)
        return(
            <>
            
                <Header name={this.state.name} imageUrl={this.state.profileImageURL} />
                
                <div className="pals-list container">
                    
                    <h1>Take a look at all your Pals!</h1>
                    <h2 className="add-pal-button" onClick={() => window.location = "/pals/addpal"} >Add Pal</h2>
                    
                    {list}
                </div>
            </>
        )
    }
}
export default Pals;