import React, { Fragment } from 'react'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import './Header.scss'

const authenticatedOptions = (user) => (
  <Fragment>
    <Nav.Link eventKey="4" href="#watchlists">Watchlists</Nav.Link>
    <NavDropdown
      title={user.email}
      id="collasible-nav-dropdown"
    >
      <NavDropdown.Item eventKey="5" href="#change-password">Change Password</NavDropdown.Item>
      <NavDropdown.Item eventKey="6" href="#sign-out">Sign Out</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link eventKey="2" href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link eventKey="3" href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/" eventKey="1">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar collapseOnSelect bg="transparent" variant="dark" expand="md">
    <div className="container">
      <Navbar.Brand href="#">
        CryptoPicket
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { alwaysOptions }
          { user ? authenticatedOptions(user) : unauthenticatedOptions }
        </Nav>
      </Navbar.Collapse>
    </div>
  </Navbar>
)

export default Header
