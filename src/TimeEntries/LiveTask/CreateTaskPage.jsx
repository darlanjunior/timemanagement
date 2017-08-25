import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import LiveTaskForm from './LiveTaskForm';
import ajax from '../../Shared/ajax';

class CreateTaskPage extends Component {
  state = {
    error: undefined
  }

  submit = form => {
    const {reload, refreshLiveTask, history, match} = this.props

    reload(form, 'post')
      .then(response => {
        if(response.status === 'success') {
          refreshLiveTask()
          history.goBack()
        } else {
          const error = response.errors.full_messages || response.errors
          this.setState({error})
        }
      })
  }

  render() {
    return <LiveTaskForm
      title="Create Ongoing Task"
      submit={this.submit}
      error={this.state.error}/>
  }
}



export default withRouter(ajax({
  url: '/live_tasks',
  params: ({match}) => !!match.params.userId? {user_id: match.params.userId} : {},
  loadOnMount: false
})(CreateTaskPage))
