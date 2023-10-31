import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const PendingLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    // Fetch pending leave requests from the backend
    axios.get('http://localhost:8080/api/v1/leaveRequests')
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pending leave requests:', error);
      });
  }, []);

  return (
    <Container>
      <div className="sidebar-container">
        <Sidebar />
        <div className="content-container">
          <Navbar expand="lg" variant="dark" style={{ background: '#202020' }}>
            <Container>
              <Navbar.Brand className="mx-auto">Employee Leave Management</Navbar.Brand>
              <Nav className="ml-auto">
                <Link to="/" className="nav-link">Logout</Link>
              </Nav>
            </Container>
          </Navbar>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ float: 'left', marginTop: '20px', fontWeight: 'bold' }}>
              Latest Leave Application
            </div>
          </div>
          <hr style={{ borderColor: 'green', text: 'bold' }} />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S No.</th>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>Posting Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request, index) => (
                <tr key={request.leave_id}>
                  <td>{index + 1}</td>
                  <td>{request.employee ? `${request.employee.firstName} ${request.employee.lastName}` : 'N/A'}</td>
                  <td>{request.leave_type}</td>
                  <td>{request.posting_date ? new Date(request.posting_date).toDateString() : 'N/A'}</td>
                  <td>{request.status}</td>
                  <td>
                    <Button variant="success">Approve</Button>{' '}
                    <Button variant="danger">Decline</Button>
                  </td>
                </tr>
              ))}
            </tbody>

          </Table>
        </div>
      </div>
    </Container>
  );
};

export default PendingLeave;
