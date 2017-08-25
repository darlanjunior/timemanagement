import { Button, Form, Message, Segment } from 'semantic-ui-react';
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
      history,
      reload,
      timeEntries,
      match: {
        params: {id}
      }
    } = this.props

    if(!timeEntries) return <div></div>

    const timeEntry = timeEntries.find(tm => tm.id === id).attributes
    const {success, error} = this.state

    return <Segment>
      <h2>Edit Time Entry</h2>
      <ReactForm
      defaultValues={timeEntry}
      onSubmit={
        form => {
          reload(form, 'put', '/'+id)
            .then(response => {
              if(response.status === 'success') {
                this.setState({success: 'Entry updated successfully', error: undefined})
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
      }>
      {({submitForm, errors, values}) => {
        return <Form {...this.state} onSubmit={submitForm}>

          <Input label="Name" field="name" />
          <Input label="Description" field="description" type="textarea" />
          <Input label="Date" field="date" mask="9999-99-99" placeholder="YYYY-MM-DD"/>
          <Input label="Duration" field="duration" mask="99:99" placeholder="HH:MM"/>

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
})(EditTimeEntryPage));
