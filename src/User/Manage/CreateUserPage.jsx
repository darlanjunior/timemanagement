import { Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import UserForm from '../UserForm';
import ajax from '../../Shared/ajax';

class CreateUserPage extends Component {
  state = {
    success: undefined,
    error: undefined
  }

  render() {
    const {reload, history, refreshList} = this.props

    return <Segment>
      <h2>Create User</h2>
      <UserForm
      {...this.state}
      submit={user =>
        reload(user, 'post')
          .then(response => {
            if(response.status === 'success') {
              refreshList()
              history.goBack()
            } else {
              this.setState({
                error: response.errors.full_messages || response.errors,
                success: undefined
              })
            }
          })
      }
      fields={{
        name: 'text',
        email: 'text',
        role: 'text'
      }} />
      </Segment>
  }
}

export default withRouter(ajax({
  url: '/users',
  loadOnMount: false
})(CreateUserPage));
