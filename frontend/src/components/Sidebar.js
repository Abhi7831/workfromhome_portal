import React from 'react';
import { Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiGrid, BiBuilding, BiTime, BiUser, BiArchive } from 'react-icons/bi'; // Import icons from a library

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="admin-title">
        <p className="text-white">Admin</p>
      </div>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/admin-dashboard">
          <BiGrid className="icon" /> Dashboard
        </Nav.Link>
        <hr className="divider" />
        <Nav.Link as={Link} to="/admin/departments">
          <BiBuilding className="icon" /> Departments
        </Nav.Link>
        <hr className="divider" />
        <Nav.Link as={Link} to="/admin/leave-types">
          <BiTime className="icon" /> Leave Types
        </Nav.Link>
        <hr className="divider" />
        <Nav.Link as={Link} to="/admin-dashboard">
          <BiUser className="icon" /> Employees
        </Nav.Link>
        <hr className="divider" />
        <Dropdown as={Nav.Item}>
          <Dropdown.Toggle as={Nav.Link}>
            <BiArchive className="icon" /> Leave Management
          </Dropdown.Toggle>
          <Dropdown.Menu >
            <Dropdown.Item as="button" href="/admin/leave-management?filter=all">All Leave</Dropdown.Item>
            <Dropdown.Item as="button" href="/admin/leave-management?filter=approved">Approved Leave</Dropdown.Item>
            <Dropdown.Item as={Link} to="/admin/pending-leave">Pending Leave</Dropdown.Item>
            <Dropdown.Item as="button" href="/admin/leave-management?filter=notapproved">Not Approved Leave</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </div>
  );
};

export default Sidebar;
