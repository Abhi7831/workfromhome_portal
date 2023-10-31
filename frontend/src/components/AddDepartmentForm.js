import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './AddUser.css';

const AddDepartmentForm = () => {
  const [department, setDepartment] = useState({
    departmentName:'',
    departmentCode:'',
  });

  const handleUserChange = (e) => {
    setDepartment({
      ...department,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your Spring Boot backend to add the user
      const response = await axios.post('http://localhost:8080/api/v1/employees', department);

      // Handle the response (e.g., show a success message, reset the form, update the user list)
      console.log('Department added successfully:', response.data);

      // Reset the form
      setDepartment({
        departmentName:'',
        departmentCode:'',
      });

      // You may want to update the user list by fetching the updated list from the server
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Form.Group controlId="deptName">
                            <Form.Label>Department Name</Form.Label>
                            <Form.Control
                            type="text"
                            name="deptName"
                            placeholder="Enter Department"

                            value={department.departmentName}
                            onChange={handleUserChange}
                          />
                        </Form.Group>

         <Form.Group controlId="deptCode">
                    <Form.Label>Department Code</Form.Label>
                    <Form.Control
                    type="text"
                    name="deptCode"
                    placeholder="Enter Code"

                    value={department.departmentCode}
                    onChange={handleUserChange}
                  />
                  </Form.Group>
      </div>
      {/* Add input fields for other user information (Last Name, Email, etc.) */}
      <br/ >
      <button type="submit" className='saveBtn'>Save Department</button>
    </form>
  );
};

export default AddDepartmentForm;