import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';

const Header = () => {
    return (
        <div>
            <header>
            <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
                <Container>
                  <LinkContainer to="/">
                  <Navbar.Brand href="/">Pink guy shop</Navbar.Brand>
                  </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <LinkContainer to="/cart">
      <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/login">
      <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
      </LinkContainer>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
  </Container>
</Navbar>
            </header>
        </div>
    )
}

export default Header
