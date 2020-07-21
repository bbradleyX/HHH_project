import React from "react"
import "../css/addlog.css"
import Axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
class AddLogForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          pal: '',
          date: new Date(),
          general_notes: '',
          id: window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId(),
          data: []
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
      Axios.get('http://localhost:3001/api/getContacts?id=' + this.state.id, this.state)
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            data: response.data,
            pal: response.data[0]._id
        });
        console.log(this.state)
        }
          
      })
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
      const log = {
        user_id: this.state.id,
        contact_id: this.state.pal,
        date: this.state.date,
        notes: this.state.general_notes
      }
      Axios.post("http://localhost:3001/api/addLogs", log)
      .then(response => {
        console.log(response)
        window.location = "/";
      })
      .catch(error => {
        console.log(error)
      })
      event.preventDefault();
    }
  
    render() {
      const palsList = this.state.data.map((pal) => {
            
        return(
        <option value={pal._id}>{pal.name + " " + pal.last_name}</option>
        )
        
      });
      if (this.state.data.length == 0) {
        return(
          <h2>You have no pals! Add some pals to start logging your conversations</h2>
        )
      }
      else {
        return (
          <form onSubmit={this.handleSubmit} className="add-log-form">
            <label>Pal:</label>
              <select value={this.state.pal} onChange={this.handleChange} name="pal" required>
                {palsList}
              </select>
            
            <label>Date: </label>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={date => {
                    this.setState({
                      date: date
                    })
                  }}
                />
              </div>
            <label>Notes:</label>
              <textarea value={this.state.general_notes} onChange={this.handleChange} name="general_notes" />
            
            <input type="submit" value="Submit" />
          </form>
        );
      }
      
    }
  }
  export default AddLogForm;