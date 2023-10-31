import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './Dashboard.css';
import './Sidebar.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddUser from './AddUser';
import Sidebar from './Sidebar';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [editedEmployee, setEditedEmployee] = useState({
    emailId: '',
    firstName: '',
    lastName: '',
    department: '',
    password: '',
    position: '',
    phoneNumber: '',
  });

  useEffect(() => {
    // Fetch employee details from your Spring backend API
    axios.get('http://localhost:8080/api/v1/employees').then((response) => {
      setEmployees(response.data);
    });
  }, []);

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setSelectedAction('View');
    setShowModal(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setSelectedAction('Edit');
    setEditedEmployee({ ...employee }); // Initialize the editedEmployee state with the selected employee's data
    setShowModal(true);
  };

 const handleDelete = async (employeeId) => {
     try {
       // Send a DELETE request to remove the employee from the backend
       await axios.delete(`http://localhost:8080/api/v1/employees/${employeeId}`);
       // Remove the employee from the local state
       setEmployees((prevEmployees) =>
         prevEmployees.filter((employee) => employee.empId !== employeeId)
       );
     } catch (error) {
           if (error.response) {
             // The server responded with an error. Log the error response data.
             console.error('Error deleting employee:', error.response.data);
           } else {
             // There was an error before the request was sent. Log the error message.
             console.error('Error deleting employee:', error.message);
           }
         }
   };


  const handleClose = () => {
    setSelectedEmployee(null);
    setSelectedAction('');
    setShowModal(false);
  };

const handleSaveEdit = async () => {
    try {
      // Send a PUT request to update the employee details in the backend
      await axios.put(`http://localhost:8080/api/v1/employees/${selectedEmployee.empId}`, editedEmployee);
      // Update the local state with the edited employee details
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.empId === selectedEmployee.empId ? { ...employee, ...editedEmployee } : employee
        )
      );
      handleClose();
    } catch (error) {
                if (error.response) {
                  // The server responded with an error. Log the error response data.
                  console.error('Error saving employee:', error.response.data);
                } else {
                  // There was an error before the request was sent. Log the error message.
                  console.error('Error saving employee:', error.message);
                }
              }
  };


  return (
    <Container>
    <div className="sidebar-container">
        <Sidebar /> {/* Include the Sidebar component here */}
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
          <Container>
                <Button
                        variant="submit"
                        className="addUser"
                        onClick={() => setShowAddUserModal(true)}
                      >
                         <span style={{ fontSize: '15px', marginRight: '5px' }}>+</span> Add User
                </Button>
                <Modal show={showAddUserModal} onHide={() => setShowAddUserModal(false)}>
                        <Modal.Header closeButton>
                          <Modal.Title>Add User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <AddUser />
                        </Modal.Body>
                      </Modal>
          </Container>
          <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.empId}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.emailId}</td>
                        <td>
                          <Button variant="info" className="mr-2" onClick={() => handleView(employee)}>
                            View
                          </Button>
                          {'     '}
                          <Button variant="warning" className="mr-2" onClick={() => handleEdit(employee)}>
                            Edit
                          </Button>
                          {'     '}
                          <Button variant="danger" onClick={() => handleDelete(employee.empId)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
        </div>
    </div>


      {/* View/Edit Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedAction === 'View'
              ? 'View Employee'
              : selectedAction === 'Edit'
              ? 'Edit Employee'
              : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAction === 'View' ? (
            <div>
              <p>First Name: {selectedEmployee?.firstName}</p>
              <p>Last Name: {selectedEmployee?.lastName}</p>
              <p>Email: {selectedEmployee?.emailId}</p>
              <p>Department: {selectedEmployee?.department}</p>
              <p>Position: {selectedEmployee?.position}</p>
              <p>Phone Number: {selectedEmployee?.phoneNumber}</p>
            </div>
          ) : selectedAction === 'Edit' ? (
            <Form>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={editedEmployee.firstName}
                  onChange={(e) => setEditedEmployee({ ...editedEmployee, firstName: e.target.value })}
                />
              </Form.Group>
               <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={editedEmployee.lastName}
                    onChange={(e) => setEditedEmployee({ ...editedEmployee, lastName: e.target.value })}
                  />
               </Form.Group>
              <Form.Group controlId="emailId">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="emailId"
                  name="emailId"
                  value={editedEmployee.emailId}
                  onChange={(e) => setEditedEmployee({ ...editedEmployee, emailId: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  name="department"
                  value={editedEmployee.department}
                  onChange={(e) =>
                    setEditedEmployee({ ...editedEmployee, department: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="position">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  value={editedEmployee.position}
                  onChange={(e) =>
                    setEditedEmployee({ ...editedEmployee, position: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={editedEmployee.phoneNumber}
                  onChange={(e) =>
                    setEditedEmployee({ ...editedEmployee, phoneNumber: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {selectedAction === 'Edit' ? (
            <Button variant="primary" onClick={handleSaveEdit}>
              Save
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
