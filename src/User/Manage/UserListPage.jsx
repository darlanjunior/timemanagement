import { Button, Form } from 'semantic-ui-react';
import { Link, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import _ from 'lodash'

import CreateUserPage from './CreateUserPage';
import EditUserPage from './EditUserPage';
import PageMenu from '../../Shared/Pagination/PageMenu';
import UserList from './UserList';
import ajax from '../../Shared/ajax';

class UserListPage extends Component {
  state = {
    page: 1,
    items_per_page: 5,
    search_term: ''
  }

  updateSearchTerm(e, target) {
    this.changeResults({search_term: target.value})
  }

  mergeStateWith(params, state={}) {
    return _.omitBy({...state, ...params}, val => !val)
  }

  changeResults(params) {
    const newState = {...this.state, ...params}

    this.setState(newState, _.debounce(
      () => this.props.reload(newState),
      300
    ))
  }

  render() {
    const {
      mergeStateWith,
      updateSearchTerm,
      changeResults,
      state: {
        search_term,
        page,
        items_per_page
      },
      props: {
        match,
        loading,
        reload,
        response: {
          data,
          meta
        }
      }
    } = this;

    const createUserPage = () => <CreateUserPage refreshList={() => reload(mergeStateWith(this.state))}/>
    const editUserPage = () => <EditUserPage users={data} refreshList={() => reload(mergeStateWith(this.state))} />

    return <div>
      <Switch>
        <Route
          exact
          path={`${match.path}/new`.replace(/\/\//g, '/')}
          render={createUserPage} />
        <Route
          path={`${match.path}/:id`.replace(/\/\//g, '/')}
          render={editUserPage} />
      </Switch>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>User list</h2>
        <Form.Input
          placeholder="Search"
          type="text"
          value={search_term}
          onChange={updateSearchTerm.bind(this)} />
      </div>
      <UserList
        loading={loading}
        users={data}
        reload={() => reload()}/>
      <PageMenu
        page={page}
        count={(meta && meta.count) || 0}
        items_per_page={items_per_page}
        changePage={changeResults.bind(this)} />
      <Link to="/users/new">
        <Button
          icon="add user"
          content="Create User"
          floated="right"/>
      </Link>
    </div>
  }
}

export default ajax({
  url: '/users'
})(UserListPage)
