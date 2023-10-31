import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal,Form } from 'react-bootstrap';
import axios from 'axios';
import UserRequestForm from './UserRequestForm';
import UserSidebar from './UserSidebar';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const UserRequest = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);

  const updateDashboard = () => {
    axios
      .get('http://localhost:8080/api/v1/leaveRequests')
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    updateDashboard(); // Initial fetch when the component mounts
  }, []);

  const handleMakeRequest = () => {
    setShowAddUserModal(true);
  };

  const handleClose = () => {
    setShowAddUserModal(false);
  };

  return (
    <Container>
    <div className="sidebar-container">
        <UserSidebar />
      <div className="content-container">
      <Navbar expand="lg" variant="dark" style={{background:'#202020'}}>
                               <Container>
                                      <Navbar.Brand className="mx-auto">Employee Leave Management</Navbar.Brand>
                                      <Nav className="ml-auto">
                                         <Link to="/" className="nav-link">Logout</Link>
                                      </Nav>
                               </Container>
                       </Navbar>
        <h2 className="mt-4">Leave Requests</h2>
        <Container>
          <Button
            variant="submit"
            className="makeRequest"
            onClick={handleMakeRequest}

            style={{background:'green',color:'white'}}
          >
            Make Request
          </Button>
          <UserRequestForm
            show={showAddUserModal}
            handleClose={handleClose}
            updateDashboard={updateDashboard}
          />
        </Container>
        <Table striped bordered hover className="userTable">
          <thead>
            <tr>
              <th>S No.</th>
              <th>Leave Type</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Description</th>
              <th>Admin Remark</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request, index) => (
              <tr key={request.leave_id}>
                <td>{index + 1}</td>
                <td>{request.leave_type}</td>
                <td>{request.from_date}</td>
                <td>{request.to_date}</td>
                <td>{request.description}</td>
                <td>{request.admin_remark}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      </div>
    </Container>
  );
};

export default UserRequest;
