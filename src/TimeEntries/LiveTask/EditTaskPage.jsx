import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import LiveTaskForm from './LiveTaskForm';
import ajax from '../../Shared/ajax';

class EditTaskPage extends Component {
  state = {
    error: undefined
  }

  submit = form => {
    const {reload, history, match, task: {id}} = this.props

    reload(form, 'put', `/${id}`)
      .then(response => {
        if(response.status === 'success') {
          history.goBack()
        } else {
          const error = response.errors.full_messages || response.errors
          this.setState({error})
        }
      })
  }

  render() {
    const { task } = this.props
    if(!task) return <div></div>

    return <LiveTaskForm
      title={`Edit Ongoing Task ${task.name}`}
      task={task}
      submit={this.submit}
      error={this.state.error}/>
  }
}

export default withRouter(ajax({
  url: '/live_tasks',
  params: ({match}) => !!match.params.userId? {user_id: match.params.userId} : {},
  loadOnMount: false
})(EditTaskPage))
