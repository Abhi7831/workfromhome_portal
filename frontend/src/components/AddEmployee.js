import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        department: '',
        position: '',
        phoneNumber: '',
        role: 'user'
    });

    const history = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to add a new employee
            await axios.post('http://localhost:8080/api/v1/employees', employee);

            // Redirect back to the previous page after successful submission
            history.goBack();
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        <Container>
            <h2>Add Employee</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        value={employee.first_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="last_name">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="last_name"
                                        value={employee.last_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={employee.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                <Form.Group controlId="department">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                        type="text"
                        name="department"
                        value={employee.department}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="position">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                        type="text"
                        name="position"
                        value={employee.position}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={employee.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default AddEmployee;
