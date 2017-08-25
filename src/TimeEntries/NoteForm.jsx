import { Button, Message, Form } from 'semantic-ui-react';
import { Form as ReactForm } from 'react-form';
import React, { Component } from 'react';

import Input from '../Shared/Input';
import ajax from '../Shared/ajax';

class NoteForm extends Component {
  state = {
    error: undefined
  }

  render() {
    const {reload, submit} = this.props
    const {error} = this.state

    return <ReactForm
      onSubmit={form => (
        reload(form, 'post').then((note) => submit(note))
      )}>
      {({submitForm, errors, values}) => (
        <Form {...this.state} onSubmit={submitForm}>
          <Input
            field="text"
            action={<Button icon="add" type="submit" />}/>

          <Message error content={!!error && error.map(e => <li>{e}</li>)}/>
        </Form>
      )}
    </ReactForm>
  }
}

export default ajax({
  url: ({timeEntryId}) => `/time_entries/${timeEntryId}/notes`,
  params: ({userId}) => !!userId? {user_id: userId} : {},
  loadOnMount: false
})(NoteForm)
