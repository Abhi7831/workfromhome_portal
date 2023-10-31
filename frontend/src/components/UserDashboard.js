import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const UserDashboard = () => {
    const [employee, setEmployee] = useState('');
    const [error, setError] = useState('');
    const { state } = useLocation();


    useEffect(() => {
        const { id, password } = state;
        axios
            .get(`http://localhost:8080/api/v1/employees/${id}`)
            .then((response) => {
                setEmployee(response.data);
            })
            .catch((error) => {
                setError('Error fetching employee details');
            });
    }, [state]);

    return (
//        <div>
//            <Navbar variant="dark" style={{background:'linear-gradient(180deg, #007bff, #0047ab)'}} >
//                <Container>
//                    <Navbar.Brand>Employee Leave Management</Navbar.Brand>
//                    <Nav className="ml-auto">
//                        <Link to="/" className="nav-link">Logout</Link>
//                    </Nav>
//                </Container>
//            </Navbar>
//            <UserSidebar />
//            <center>
//                <Container>
//                    <Card>
//                        <Card.Body>
//                            <Card.Title>{employee.firstName}</Card.Title>
//                            <Card.Text>{employee.lastName}</Card.Text>
//                            <Card.Text style={{background:'lightgray'}}>Email: {employee.emailId}</Card.Text>
//                            <Card.Text style={{background:'lightgray'}}>Department: {employee.department}</Card.Text>
//                            <Card.Text style={{background:'lightgray'}}>Position: {employee.position}</Card.Text>
//                            <Card.Text style={{background:'lightgray'}}>Phone Number: {employee.phoneNumber}</Card.Text>
//                        </Card.Body>
//                    </Card>
//                    {error && <p className="text-danger">{error}</p>}
//                </Container>
//            </center>
//
//        </div>

<Container>
    <div className="sidebar-container">
        <UserSidebar /> {/* Include the Sidebar component here */}
        <div className="content-container">
        <Navbar expand="lg" variant="dark" style={{background:'#202020'}}>
                 <Container>
                        <Navbar.Brand className="mx-auto">Employee Leave Management</Navbar.Brand>
                        <Nav className="ml-auto">
                           <Link to="/" className="nav-link">Logout</Link>
                        </Nav>
                 </Container>
              </Navbar>
          <h2 className="mt-4">Employee List</h2>
          <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>Emp Id</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Position</th>
                      <th>Phone Number</th>
                    </tr>
                  </thead>
                  <tbody>

                      <tr key={employee.id}>
                        <td>1</td>
                        <td>{employee.empId}</td>
                        <td>{employee.emailId}</td>
                        <td>{employee.department}</td>
                        <td>{employee.position}</td>
                        <td>{employee.phoneNumber}</td>

                      </tr>

                  </tbody>
                </Table>
        </div>
    </div>
    </Container>

    );
};

export default UserDashboard;