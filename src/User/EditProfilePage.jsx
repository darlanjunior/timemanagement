import React, { Component } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'

import UserForm from './UserForm';
import ajax from '../Shared/ajax';

class EditProfilePage extends Component {
  state = {
    success: undefined,
    error: undefined
  }

  submitForm = user =>
    this
      .props
      .reload(user, 'put')
      .then(response => {
        if(response.status === 'success') {
          this.setState({
            success: 'Profile updated',
            error: undefined
          })
          this.context.setCurrentUser(response.data)
        } else {
          this.setState({
            error: response.errors.full_messages || response.errors,
            success: undefined
          })
        }
      })

  render = () => {
    const {name, preferred_working_hours, role} = this.context.currentUser
    return <div>
      <h2>Edit profile</h2>
      <UserForm
        fields={_.merge({
          name: 'text',
          password: 'password',
          password_confirmation: 'password'
        }, role === 'EndUser' ? {preferred_working_hours} : {}
        )}
        initialValues={() => { return {
          name,
          preferred_working_hours: (role === 'EndUser' ? preferred_working_hours : undefined)
        }}}
        {...this.state}
        submit={this.submitForm} />
    </div>
  }
}

EditProfilePage.contextTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.function
}

export default ajax({
  url: '/users',
  loadOnMount: false
})(EditProfilePage)
