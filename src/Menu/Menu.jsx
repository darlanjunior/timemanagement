import {
  Container,
  Dropdown,
  Icon,
  Item,
  Menu as SemanticMenu,
} from 'semantic-ui-react';
import { Link, Route, Switch } from 'react-router-dom';
import React from 'react';
import cookie from 'react-cookies'

import PropTypes from 'prop-types'

import EditProfilePage from '../User/EditProfilePage';
import ForgotPasswordPage from '../User/ForgotPasswordPage';
import RegisterPage from '../User/RegisterPage';
import ShowTimeEntryPage from '../TimeEntries/ShowTimeEntryPage';
import SignInPage from '../User/SignInPage';
import TimeEntryListPage from '../TimeEntries/TimeEntryListPage';
import UserListPage from '../User/Manage/UserListPage';
import UserRouter from '../User/UserRouter';

const UnsignedMenu = () => (
  <SemanticMenu>
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
  </SemanticMenu>
)

const logout = () => {
  cookie.remove('authorization')
  window.location = '/'
}

const SignedMenu = ({name, role}) => (
  <SemanticMenu>
    <Item>
      <Link to="/time_entries">
        <Icon name='clock' />
        Time Entries
      </Link>
    </Item>
    {role !== 'EndUser' ? <Item>
      <Link to="/users">
        <Icon name='user' />
        Users
      </Link>
    </Item> : null }

    <SemanticMenu.Menu position='right'>
      <Dropdown item text={`Welcome, ${name} - ${role}`}>
        <Dropdown.Menu>
          <Link to='/profile'><Dropdown.Item>Edit profile</Dropdown.Item></Link>
          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </SemanticMenu.Menu>
  </SemanticMenu>
)

const Menu = (_, {currentUser: {name, role}}) => (
  <div>
    {!!name? <SignedMenu name={name} role={role} /> : <UnsignedMenu /> }
    <Container>
      <Switch>
        <Route path="/users/:userId/time_entries" component={UserRouter} />
        <Route path="/users" component={UserListPage} />
        <Route exact path="/time_entries/:id/show" component={ShowTimeEntryPage} />
        <Route path="/time_entries" component={TimeEntryListPage} />
        <Route path="/sign_in" component={SignInPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/profile" component={EditProfilePage} />
        <Route path="/password" component={ForgotPasswordPage} />
        <Route component={!!role? (role === 'EndUser'? TimeEntryListPage : UserListPage) : SignInPage} />
      </Switch>
    </Container>
  </div>
)

Menu.contextTypes = {
  currentUser: PropTypes.object
}

export default Menu;
