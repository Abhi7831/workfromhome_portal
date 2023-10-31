import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import AddDepartmentForm from'./AddDepartmentForm';

const Departments = () => {
    const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
      };
    return (
        <Container>
            <div className="sidebar-container">
                <Sidebar /> {/* Include the Sidebar component here */}
                <div className="content-container">
                    <Navbar expand="lg" variant="dark" style={{ background: '#202020' }}>
                        <Container>
                            <Navbar.Brand className="mx-auto">Employee Leave Management</Navbar.Brand>
                            <Nav className="ml-auto">
                                <Link to="/" className="nav-link">Logout</Link>
                            </Nav>
                        </Container>
                    </Navbar>
                    <div style={{ display: 'flex' , justifyContent: 'space-between'}}>
                        <div style={{ float: 'left', marginTop: '20px', fontWeight: 'bold'}}>
                            Department
                        </div>
                        <Button variant="submit" className="addDepartments" style={{ float: 'right', backgroundColor: 'green', color: 'white',marginTop: '10px' }}
                            onClick={() => setShowAddDepartmentModal(true)}>
                             <span style={{ fontSize: '20px' }}>+</span> Add New Department
                        </Button>

                        <Modal show={showAddDepartmentModal} onHide={() => setShowAddDepartmentModal(false)}>
                                                <Modal.Header closeButton>
                                                  <Modal.Title>Add Department</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                  <AddDepartmentForm />
                                                </Modal.Body>
                                              </Modal>
                    </div>
                    <hr style={{ borderColor: 'green', text: 'bold' }} />
                    <Table striped bordered hover>
                                      <thead>
                                        <tr>
                                          <th>S No.</th>
                                          <th>Dept Name</th>
                                          <th>Dept Code</th>
                                          <th>Creation Date</th>
                                          <th>Action</th>
                                        </tr>
                                      </thead>
                    </Table>
                </div>
            </div>
        </Container>
    );
};

export default Departments;
