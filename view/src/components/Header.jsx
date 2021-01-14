import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { logout } from '../redux/user/userAction'

const Header = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

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
      {userInfo ? (
        <NavDropdown title={userInfo.name} id='username'>
          <LinkContainer to='/profile'>
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
        </NavDropdown>
      ) : ( 
      <LinkContainer to="/login">
      <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
      </LinkContainer>
      )}
      {userInfo && userInfo.isAdmin ? (
                <NavDropdown title='Admin' id='adminmenu'>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
      ) : ( <p>no admin</p> )}
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
