import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import AddLeaveForm from'./AddLeaveForm';

const Leave = () => {
    const [showAddLeaveModal, setShowAddLeaveModal] = useState(false);
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
                            Manage Leave Type
                        </div>
                        <Button variant="submit" className="addDepartments" style={{ float: 'right', backgroundColor: 'green', color: 'white',marginTop: '10px' }}
                            onClick={() => setShowAddLeaveModal(true)}>
                             <span style={{ fontSize: '20px' }}>+</span> Add New Leave Type
                        </Button>

                        <Modal show={showAddLeaveModal} onHide={() => setShowAddLeaveModal(false)}>
                                                <Modal.Header closeButton>
                                                  <Modal.Title>Add Leave</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                  <AddLeaveForm />
                                                </Modal.Body>
                                              </Modal>
                    </div>
                    <hr style={{ borderColor: 'green', text: 'bold' }} />
                    <Table striped bordered hover>
                                      <thead>
                                        <tr>
                                          <th>S No.</th>
                                          <th>Leave Type</th>
                                          <th>Description</th>
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

export default Leave;
