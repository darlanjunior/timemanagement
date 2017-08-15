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

const SignedMenu = ({name}) => (
  <SemanticMenu.Menu position='right'>
    <Dropdown item text={`Welcome, ${name}`}>
      <Dropdown.Menu>
        <Link to='/profile'><Dropdown.Item>Edit profile</Dropdown.Item></Link>
        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </SemanticMenu.Menu>
)

const Menu = (_, {currentUser: {name}}) => (
  <div>
    <SemanticMenu>
      <Item>
        <Link to="/">
          <Icon name='home' />
          Home
        </Link>
      </Item>
      {!!name? <SignedMenu name={name} /> : <UnsignedMenu /> }
    </SemanticMenu>
    <Container>
      <Route exact path="/" component={TimeEntryListPage} />
      <Route exact path="/time_entries" component={TimeEntryListPage} />
      <Route exact path="/sign_in" component={SignInPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/profile" component={EditProfilePage} />
      <Route exact path="/password" component={ForgotPasswordPage} />
    </Container>
  </div>
)

Menu.contextTypes = {
  currentUser: PropTypes.object
}

export default Menu;
