import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'
import { Navbar, Container } from 'react-bootstrap';
import Label from 'react'
import Signup from './Signup'

const LoginPage = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ id: '', pass: '' });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSignupClick = () => {
        navigate('/signup'); // Assuming '/signup' is the path defined for the Signup component
      };

    const handleLogin = async (e) => {

            e.preventDefault();

            try {

                const response = await axios.get(`http://localhost:8080/api/v1/employees/${credentials.id}`);
                const { password, role } = response.data;
                console.log(response.data);
                  if (response.status === 200 && password === credentials.pass ) {
                    if (role === 'admin') {
                        navigate('/admin-dashboard');
                    } else if (role === 'user') {
                        navigate('/user-dashboard', { state: credentials });
                    } else if (role === 'manager') {
                        navigate('/manager-dashboard');
                    }
                    else {
                        setError('Login failed. Please check your credentials');
                    }
                } else {
                    console.error('Employee not found. Please check your credentials');
                    setError('Login failed. Please check your credentials.');
                }
            } catch (error) {
                setError('Login failed. Please check your credentials.');
            }
        };

    return (
        <div className='loginPage'>
            <Navbar variant="dark" style={{background:'linear-gradient(180deg, #007bff, #0047ab)'}}>
                <Container>
                    <Navbar.Brand className="mx-auto">Employee Leave Management</Navbar.Brand>
                </Container>
            </Navbar>
            <div className="login-form">
                <Form onSubmit={handleLogin}>
                    <h2>Login</h2>
                     <h6 style={{background:'red'}}>{error?<div>{error}</div>:null}</h6>
                    <Form.Group controlId="id">
                        <Form.Control
                            type="int"
                            placeholder="Employee Id"
                            name="id"
                            value={credentials.id}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="pass">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="pass"
                            value={credentials.pass}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    {'       '}

                    <Button variant="secondary" onClick={handleSignupClick}>
                        Sign Up
                    </Button>

                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
