import React from "react"
import "../css/addpal.css"
import axios from 'axios'
class AddPalForm extends React.Component {
    constructor(props) {
      super(props);
      const authInstance = window.gapi.auth2.getAuthInstance()
      const user = authInstance.currentUser.get()
      const profile = user.getBasicProfile()
      const id = profile.getId()

      this.state = {
          user_id: id,
          name: '',
          last_name: '',
          category: 'Friends',
          email: '',
          phone_number: '',
          contact_method: '',
          general_notes: '',
          frequency: '3'
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
      
    }
  
    handleSubmit(event) {
      const phoneRE = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
      const emailRE = /^[\w!#$%&'*+\/=?^_`{|}~-]+@([\w\-]+(?:\.[\w\-]+)+)$/;
      let error = "";
      document.getElementById("add-pal-form-error-phone").innerText = ""
      document.getElementById("add-pal-form-error-email").innerText = ""
      if (!(phoneRE.test(this.state.phone_number) || this.state.phone_number == "")) {
        error += "invalid phone number"
        document.getElementById("add-pal-form-error-phone").innerText = "Please type a valid phone number: ###-###-####"
      }
      if (!(emailRE.test(this.state.email) || this.state.email == "")) {
        error += "invalid email"
        document.getElementById("add-pal-form-error-email").innerText = "Please type a valid email"
      }
     if (error == "") {
       axios.post('http://localhost:3001/api/addContact', this.state)
        .then(response => {
          console.log("response: " + response)

        })
        .catch(error => {
          console.log(error)
        })
     }

      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit} className="add-pal-form">
          <label>
            First Name: 
            <input type="text" value={this.state.name} onChange={this.handleChange} name="name" required/>
          </label>
          <label>
            Last Name: 
            <input type="text" value={this.state.last_name} onChange={this.handleChange} name="last_name" required/>
          </label>
          <label>
            Remind me every: 
            <select value={this.state.category} onChange={this.handleChange} name="category" required>
              <option value="Friends">friends</option>
              <option value="Family">family</option>
              <option value="Professional">professional</option>
            </select>
          </label>
          <label>
            Connection Type: 
            <select value={this.state.category} onChange={this.handleChange} name="category" required>
              <option value="Friends">friends</option>
              <option value="Family">family</option>
              <option value="Professional">professional</option>
            </select>
          </label>
          <label>
            Email: 
            <input type="text" value={this.state.email} onChange={this.handleChange} name="email" />
          </label>
          <label>
            Phone Number: 
            <input type="text" value={this.state.phone_number} onChange={this.handleChange} name="phone_number" />
          </label>
          <label>
            Contact Method: 
            <input type="text" value={this.state.contact_method} onChange={this.handleChange} name="contact_method"/>
          </label>
          <label>
            Notes: 
            <textarea value={this.state.general_notes} onChange={this.handleChange} name="general_notes" />
          </label>
          <input type="submit" value="Submit" />
          <h5 id="add-pal-form-error-phone"></h5>
          <h5 id="add-pal-form-error-email"></h5>
        </form>
        
      );
    }
  }
  export default AddPalForm;