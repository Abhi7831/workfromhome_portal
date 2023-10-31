import React, { useState, useEffect } from 'react';
import { Container, Button, Table, Navbar, Nav, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const ManagerDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedAction, setSelectedAction] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [performanceData, setPerformanceData] = useState({ score: '', comments: '' });

    const [editedEmployee, setEditedEmployee] = useState({
       emailId: '',
       firstName: '',
       lastName: '',
       department: '',
       password:'',
       position: '',
       phoneNumber: '',
       score:'',
       comments:''
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

    const handlePerformance = async (employee) => {
        setSelectedEmployee(employee);
        setSelectedAction('Performance');

        setEditedEmployee({ ...employee }); // Initialize the editedEmployee state with the selected employee's data
        setShowModal(true);

        try {
            // Fetch performance data for the selected employee from your backend here
            const response = await axios.get(`http://localhost:8080/api/v1/employees/${employee.id}`);
            const { score, comments } = response.data;
            setPerformanceData({ score, comments });
            console.log(editedEmployee);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching performance data:', error);
        }
    };

    const handleClose = () => {
        setSelectedEmployee(null);
        setSelectedAction('');
        setShowModal(false);
    };

    const handleSavePerformance = async () => {
        try {
            // Send a PUT request to update the performance data
            await axios.put(`http://localhost:8080/api/v1/employees/${selectedEmployee.id}/performance`, performanceData);
            handleClose();
        } catch (error) {
            console.error('Error updating performance:', error);
        }
    };

    const handleSaveEdit = async () => {
        try {
            // Send a PUT request to update the employee details in the backend
            await axios.put(`http://localhost:8080/api/v1/employees/${selectedEmployee.id}`, editedEmployee);

            // Update the local state with the edited employee details
            setEmployees((prevEmployees) =>
                prevEmployees.map((employee) =>
                    employee.id === selectedEmployee.id ? { ...employee, ...editedEmployee } : employee
                )
            );

            // Close the modal
            handleClose();
        } catch (error) {
            console.error('Error updating employee details:', error);
        }
    };

    return (
        <Container>
            <Navbar variant="dark" style={{background:'linear-gradient(180deg, #007bff, #0047ab)'}}>
                <Container>
                    <Navbar.Brand>Employee Leave Management</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Link to="/" className="nav-link">Logout</Link>
                    </Nav>
                </Container>
            </Navbar>

            <h2 className="mt-4">Employee List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{width:' 18%'}}>First Name</th>
                        <th style={{width:' 18%'}}>Last Name</th>
                        <th style={{width:' 25%'}}>Email Id</th>
                        <th style={{width:' 40%'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
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
                                {'    '}
                                <Button variant="success" onClick={() => handlePerformance(employee)}>
                                    Performance
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* View/Edit/Performance Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedAction === 'View'
                            ? 'View Employee'
                            : selectedAction === 'Edit'
                                ? 'Edit Employee'
                                : 'Performance'}
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
                             ) : selectedAction === 'Performance' ? (
                        <Form>
                            <Form.Group controlId="score">
                                <Form.Label>Score</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="score"
                                    value={performanceData.score}
                                    onChange={(e) => setPerformanceData({ ...performanceData, score: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="comments">
                                <Form.Label>Comments</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="comments"
                                    value={performanceData.comments}
                                    onChange={(e) =>
                                        setPerformanceData({ ...performanceData, comments: e.target.value })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    ) : (
                        <Form>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={editedEmployee.firstName}
                                    onChange={(e) => setEditedEmployee({ ...editedEmployee, firstName: e.target.value })}
                                    disabled={selectedAction === 'View'}
                                />
                            </Form.Group>
                            <Form.Group controlId="lastName">
                                 <Form.Label>Last Name</Form.Label>
                                 <Form.Control
                                     type="text"
                                     name="lastName"
                                     value={editedEmployee.lastName}
                                     nChange={(e) => setEditedEmployee({ ...editedEmployee, lastName: e.target.value })}
                                     disabled={selectedAction === 'View'}
                                 />
                            </Form.Group>
                            <Form.Group controlId="emailId">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="emailId"
                                    name="emailId"
                                    value={editedEmployee.emailId}
                                    onChange={(e) => setEditedEmployee({ ...editedEmployee, emailId: e.target.value })}
                                    disabled={selectedAction === 'View'}
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
                                    disabled={selectedAction === 'View'}
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
                                    disabled={selectedAction === 'View'}
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
                                    disabled={selectedAction === 'View'}
                                />
                                </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {selectedAction === 'Edit' ? (
                        <Button variant="primary" onClick={handleSaveEdit}>
                            Save
                        </Button>
                    ) : selectedAction === 'Performance' ? (
                        <Button variant="primary" onClick={handleSavePerformance}>
                            Save
                        </Button>
                    ) : null}
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ManagerDashboard;
