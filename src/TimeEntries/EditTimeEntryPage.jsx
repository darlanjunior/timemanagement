import { Button, Form, Message } from 'semantic-ui-react';
import { Form as ReactForm } from 'react-form';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import Input from '../Shared/Input';
import ajax from '../Shared/ajax';

class EditTimeEntryPage extends Component {
  state = {
    success: undefined,
    error: undefined
  }

  render() {
    const {
      refreshList,
      reload,
      timeEntries,
      match: {
        params: {id}
      }
    } = this.props

    if(!timeEntries) return <div></div>

    const timeEntry = timeEntries.find(tm => tm.id === id).attributes
    const {success, error} = this.state

    return <ReactForm
      defaultValues={timeEntry}
      onSubmit={
        form => {
          reload(form, 'put', '/'+id)
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
  }
}

export default withRouter(ajax({
  url: '/time_entries',
  loadOnMount: false
})(EditTimeEntryPage));
