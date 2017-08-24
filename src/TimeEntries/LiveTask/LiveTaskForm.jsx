import { Button, Form, Message, Segment } from 'semantic-ui-react';
import { Form as ReactForm } from 'react-form';
import React, { Component } from 'react';

import Input from '../../Shared/Input';

export default class LiveTaskForm extends Component {
  render() {
    const {title, task, submit, error} = this.props

    return <Segment>
      <h2>{title}</h2>
      <ReactForm
        defaultValues={task}
        onSubmit={(form) => submit(form)}>
        {({submitForm, errors, values}) => {
          return <Form error={!!error} onSubmit={submitForm}>

            <Input label="Name" field="name" />
            <Input label="Description" field="description" type="textarea" />

            <Message error content={!!error && error.map(e => <li>{e}</li>)}/>
            <Button type='submit'>Submit</Button>
          </Form>
        }}
      </ReactForm>
    </Segment>
  }
}
