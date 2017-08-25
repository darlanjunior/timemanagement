import { Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import ResetPasswordButton from './ResetPasswordButton';
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
      refreshList,
      match: {
        params: {id}
      }
    } = this.props

    if(!users) return <div></div>

    const {email, name, role} = users.find(u => u.id === id).attributes

    return <Segment>
      <h2>Editing {email}</h2>

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
          role: 'text'
        }} />
        <ResetPasswordButton id={id}/>
    </Segment>
  }
}

export default withRouter(ajax({
  url: '/users',
  loadOnMount: false
})(EditUserPage));
