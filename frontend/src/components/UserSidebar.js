import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserRequest from './UserRequest';
import UserDashboard from'./UserDashboard';
import { BiGrid, BiBuilding, BiTime, BiUser, BiArchive } from 'react-icons/bi'; // Import icons from a library

const UserSidebar = () => {
  return (
    <div className="sidebar">
      <div className="admin-title">
        <p className="text-white">User</p>
      </div>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/user-dashboard" state={{ id: '806853', password: '123456' }}>
          <BiGrid className="icon" /> My profile
        </Nav.Link>
        <hr className="divider" />
        <Nav.Link as={Link} to="/user-request">
          <BiBuilding className="icon" /> Leave Request
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default UserSidebar;
