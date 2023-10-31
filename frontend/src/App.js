import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import AddEmployee from './components/AddEmployee';
import ManagerDashboard from './components/ManagerDashboard';
import Signup from './components/Signup';
import UserRequest from './components/UserRequest';
import Departments from './components/Departments';
import Leave from './components/Leave';
import PendingLeave from './components/PendingLeave';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
//          <Route path="/manager-dashboard" element={<ManagerDashboard/>} />
          <Route path="/add-employee" element={<AddEmployee/>} />
          <Route path="/user-dashboard" element={<UserDashboard/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/user-request" element={<UserRequest/>} />
          <Route path="/admin/departments" element={<Departments />} />
          <Route path="/admin/leave-types" element={<Leave />} />
          <Route path="/admin/pending-leave" element={<PendingLeave />} />
          <Route path="/" element={<LoginPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
