import React from "react";
import {Modal} from 'react-bootstrap'


function Popup(props) {
    let category = props.category
    const name = props.name
    const last_name = props.last_name

    console.log(name)
    console.log(last_name)
    console.log(category)

    if (category == 'Family'){
        category = 'family member'
    } else if (category == 'Professional'){
        category = 'professional connection'
    } else {
        category = 'friend'
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Shaker
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Why don't you reach out to your {category}, {name} {last_name}, today?
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  export default Popup; 