import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const UserRequestForm = ({ show, handleClose, updateDashboard }) => {
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState(''); // Use string to handle date input
  const [toDate, setToDate] = useState(''); // Use string to handle date input
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // Convert date strings to Date objects
    const fromDateObject = new Date(fromDate);
    const toDateObject = new Date(toDate);

    // Create a leave request object
    const requestData = {
      leave_type: leaveType,
      from_date: fromDateObject.toISOString(), // Convert to ISO string
      to_date: toDateObject.toISOString(), // Convert to ISO string
      description: description,
    };

    // Send the leave request to the server
    axios
      .post('http://localhost:8080/api/v1/leaveRequests', requestData)
      .then((response) => {
        console.log('Leave request submitted successfully:', response.data);
        // Fetch updated data for the user dashboard
        updateDashboard();
        // After submitting, you can close the modal
        handleClose();
      })
      .catch((error) => {
        if (error.response) {
              console.error('Error submitting leave request:', error.response.data.message);
            } else {
              console.error('An error occurred while submitting leave request:', error.message);
            }
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Make Leave Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="leaveType">
            <Form.Label>Leave Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Leave Type"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="fromDate">
            <Form.Label>From Date</Form.Label>
            <Form.Control
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="toDate">
            <Form.Label>To Date</Form.Label>
            <Form.Control
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserRequestForm;