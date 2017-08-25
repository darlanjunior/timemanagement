import { Button, Form, Message, Segment } from 'semantic-ui-react';
import { Form as ReactForm } from 'react-form';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import Input from '../Shared/Input';
import ajax from '../Shared/ajax';

class CreateTimeEntryListPage extends Component {
  state = {
    success: undefined,
    error: undefined
  }

  render = () => {
    const {reload, refreshList} = this.props
    const {success, error} = this.state

    return <Segment>
      <h2>Create Time Entry</h2>
      <ReactForm
      onSubmit={
        form => {
          reload(form, 'post')
            .then(response => {
              if(response.status === 'success') {
                this.setState({success: true, error: undefined})
                refreshList()
              } else {
                this.setState({
                  error: response.errors.full_messages || response.errors,
                  success: undefined
                })
              }
            })
        }
      }>
      {({submitForm, errors, values}) => {
        return <Form {...this.state} onSubmit={submitForm}>

          <Input label="Name" field="name" />
          <Input label="Description" field="description" type="textarea" />
          <Input label="Date" field="date" />
          <Input label="Duration" field="duration" />

          <Message success content={!!success && success} />
          <Message error content={!!error && error.map(e => <li>{e}</li>)}/>
          <Button type='submit'>Submit</Button>
        </Form>
      }}
    </ReactForm>
    </Segment>
  }
}

export default withRouter(ajax({
  url: '/time_entries',
  params: ({match}) => !!match.params.userId? {user_id: match.params.userId} : {},
  loadOnMount: false
})(CreateTimeEntryListPage))
