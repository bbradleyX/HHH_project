import React from "react"
import "../css/addlog.css"
class AddLogForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          pal: '',
          date: '',
          notes: ''
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
      console.log(this.state)
    }
  
    handleSubmit(event) {
      alert(JSON.stringify(this.state));
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit} className="add-log-form">
          <label>
            Pal:
            <select value={this.state.pal} onChange={this.handleChange} name="pal" required>
              <option value="Jaylene Trujillo">Jaylene Trujillo</option>
              <option value="Mary Trujillo">Mary Trujillo</option>
              <option value="Carlos Cardona">Carlos Cardona</option>
            </select>
          </label>
          <label required>Log date:
            <input type="date" id="log" name="date"/>
          </label>
          <label>
            Notes:
            <textarea value={this.state.general_notes} onChange={this.handleChange} name="notes" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  export default AddLogForm;