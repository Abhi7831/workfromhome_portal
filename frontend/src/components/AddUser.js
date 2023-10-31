import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './AddUser.css';

const AddUser = () => {
  const [user, setUser] = useState({
    empId: '',
    firstName: '',
    lastName: '',
    emailId: '',
    department: '',
    position: '',
    password: '',
    gender: '',
    phoneNumber: '',
    role: '',
    country: '',
  });

  const handleUserChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your Spring Boot backend to add the user
      const response = await axios.post('http://localhost:8080/api/v1/employees', user);

      // Handle the response (e.g., show a success message, reset the form, update the user list)
      console.log('User added successfully:', response.data);

      // Reset the form
      setUser({
        empId: '',
        firstName: '',
        lastName: '',
        emailId: '',
        department: '',
        position: '',
        password: '',
        gender: '',
        phoneNumber: '',
        role: '',
        country: '',
      });

      // You may want to update the user list by fetching the updated list from the server
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Form.Group controlId="empId">
                            <Form.Label>Employee Id</Form.Label>
                            <Form.Control
                            type="text"
                            name="empId"
                            placeholder="Employee Id"

                            value={user.empId}
                            onChange={handleUserChange}
                          />
                        </Form.Group>

         <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="First Name"

                    value={user.firstName}
                    onChange={handleUserChange}
                  />
                </Form.Group>
         <Form.Group controlId="lastName">
                 <Form.Label>Last Name</Form.Label>
                 <Form.Control
                 type="text"
                 name="lastName"
                 placeholder="Last Name"

                 value={user.lastName}
                 onChange={handleUserChange}
               />
             </Form.Group>
         <Form.Group controlId="emailId">
                      <Form.Label>Email Id</Form.Label>
                      <Form.Control
                      type="text"
                      name="emailId"
                      placeholder="Enter email"

                      value={user.emailId}
                      onChange={handleUserChange}
                    />
                  </Form.Group>

         <Form.Group controlId="password">
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                     type="text"
                     name="password"
                     placeholder="Password"

                     value={user.password}
                     onChange={handleUserChange}
                   />
                 </Form.Group>
         <Form.Group controlId="gender">
           <Form.Label>Gender</Form.Label>
           <Form.Control
             as="select"
             name="gender"
             value={user.gender}
             onChange={handleUserChange}
           >
             <option value="">---Select Gender---</option>
             <option value="Male">Male</option>
             <option value="Female">Female</option>
           </Form.Control>
         </Form.Group>

         <Form.Group controlId="department">
                     <Form.Label>Department</Form.Label>
                     <Form.Control
                     type="text"
                     name="department"
                     placeholder="Enter Department"

                     value={user.department}
                     onChange={handleUserChange}
                   />
                 </Form.Group>

         <Form.Group controlId="position">
                     <Form.Label>Position</Form.Label>
                     <Form.Control
                     type="text"
                     name="position"
                     placeholder="Enter Position"

                     value={user.position}
                     onChange={handleUserChange}
                   />
                 </Form.Group>

        <Form.Group controlId="phoneNumber">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                    type="text"
                    name="phoneNumber"
                    placeholder="Mobile Number"

                    value={user.phoneNumber}
                    onChange={handleUserChange}
                  />
                </Form.Group>

        <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                    type="text"
                    name="role"
                    placeholder="Enter Role"

                    value={user.role}
                    onChange={handleUserChange}
                  />
                </Form.Group>
        <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                    type="text"
                    name="country"
                    placeholder="Enter Country"

                    value={user.country}
                    onChange={handleUserChange}
                  />
                </Form.Group>

      </div>
      {/* Add input fields for other user information (Last Name, Email, etc.) */}
      <br/ >
      <button type="submit" className='saveBtn'>Add User</button>
    </form>
  );
};

export default AddUser;