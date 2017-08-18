import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import UserForm from '../UserForm';
import ajax from '../../Shared/ajax';

class EditUserPage extends Component {
  state = {
    success: undefined,
    error: undefined
  }

  render() {
    const {
      reload,
      history,
      users,
      match: {
        params: {id}
      }
    } = this.props

    if(!users) return <div></div>

    const {email, name, role} = users.find(u => u.id === id).attributes

    return <div style={{marginBottom: '20px'}}>
      <h3>Editing {email}</h3>
      <UserForm
        {...this.state}
        initialValues={() => { return {
          name: name,
          role: role
        }}}
        submit={form =>
          reload(form, 'put', `/${id}`)
            .then(response => {
              if(response.status === 'success') {
                history.push('/')
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
          role: 'text'
        }} />
    </div>
  }
}

export default withRouter(ajax({
  url: '/users',
  loadOnMount: false
})(EditUserPage));
