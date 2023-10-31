import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './AddUser.css';

const AddLeaveForm = () => {
  const [leave, setLeave] = useState({
    leaveType:'',
    description:'',
  });

  const handleUserChange = (e) => {
    setLeave({
      ...leave,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your Spring Boot backend to add the user
      const response = await axios.post('http://localhost:8080/api/v1/employees', leave);

      // Handle the response (e.g., show a success message, reset the form, update the user list)
      console.log('leaveType added successfully:', response.data);

      // Reset the form
      setLeave({
        leaveType:'',
        description:'',
      });

      // You may want to update the user list by fetching the updated list from the server
    } catch (error) {
      console.error('Error adding leaveType:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Form.Group controlId="leaveType">
                            <Form.Label>Leave Type</Form.Label>
                            <Form.Control
                            type="text"
                            name="leaveType"
                            placeholder="Enter LeaveType"

                            value={leave.leaveType}
                            onChange={handleUserChange}
                          />
                        </Form.Group>

         <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                    type="text"
                    name="description"
                    placeholder="Enter Description"

                    value={leave.description}
                    onChange={handleUserChange}
                  />
                  </Form.Group>
      </div>
      {/* Add input fields for other user information (Last Name, Email, etc.) */}
      <br/ >
      <button type="submit" className='saveBtn'>Save</button>
    </form>
  );
};

export default AddLeaveForm;