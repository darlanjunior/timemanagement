import {
  Container,
  Dropdown,
  Icon,
  Item,
  Menu as SemanticMenu,
} from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';
import React from 'react';
import cookie from 'react-cookies'

import PropTypes from 'prop-types'

import EditProfilePage from '../User/EditProfilePage';
import ForgotPasswordPage from '../User/ForgotPasswordPage';
import RegisterPage from '../User/RegisterPage';
import SignInPage from '../User/SignInPage';
import TimeEntryListPage from '../TimeEntries/TimeEntryListPage';
import UserListPage from '../User/Manage/UserListPage';

const UnsignedMenu = () => (
  <SemanticMenu.Menu position='right'>
    <Item>
      <Link to="/sign_in">
        <Icon name='sign in' />
        Sign In
      </Link>
    </Item>

    <Item>
      <Link to="/register">
        <Icon name='add user' />
        Register
      </Link>
    </Item>
  </SemanticMenu.Menu>
)

const logout = () => {
  cookie.remove('authorization')
  window.location = '/'
}

const SignedMenu = ({name, role}) => (
  <SemanticMenu.Menu position='right'>
    <Dropdown item text={`Welcome, ${name} - ${role}`}>
      <Dropdown.Menu>
        <Link to='/profile'><Dropdown.Item>Edit profile</Dropdown.Item></Link>
        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </SemanticMenu.Menu>
)

const Menu = (_, {currentUser: {name, role}}) => (
  <div>
    <SemanticMenu>
      <Item>
        <Link to="/">
          <Icon name='home' />
          Home
        </Link>
      </Item>
      {!!name? <SignedMenu name={name} role={role} /> : <UnsignedMenu /> }
    </SemanticMenu>
    <Container>
      <Route exact path="/" component={!!role? (role === 'Admin'? UserListPage : TimeEntryListPage) : null} />
      <Route path="/users" component={UserListPage} />
      <Route path="/time_entries" component={TimeEntryListPage} />
      <Route path="/sign_in" component={SignInPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/profile" component={EditProfilePage} />
      <Route path="/password" component={ForgotPasswordPage} />
    </Container>
  </div>
)

Menu.contextTypes = {
  currentUser: PropTypes.object
}

export default Menu;
