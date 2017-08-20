import { Button, Form, Message } from 'semantic-ui-react';
import { Form as ReactForm } from 'react-form';
import React from 'react';
import PropTypes from 'prop-types'

import Select from '../Shared/Select'
import Input from '../Shared/Input';

const validate = () => {

}

const formatLabel = (label) => {
  const firstLetter = label.charAt(0).toUpperCase()
  const remainder = label.slice(1).replace('_', ' ')

  return firstLetter+remainder
}

const allowedRoles = role => {
  const roles = ['Admin', 'Manager', 'EndUser']
  const mine = roles.indexOf(role)

  return roles.slice(mine)
}

const inputFor = (field, errors, fieldType='text', role='') => {
  if(field === 'role') {
    const options = allowedRoles(role)
      .map(r => { return {
        text: r, value: r
      }
    })
    return <Select
      key='role'
      error={!!errors && !!errors['role']}
      field='role'
      label='Role'
      options={options} />
  }

  return <Input
    key={field}
    error={!!errors && !!errors[field]}
    type={fieldType}
    label={formatLabel(field)}
    field={field} />
}

const UserForm = ({
  fields,
  initialValues=(() => {}),
  submit,
  success=undefined,
  error=undefined
}, {currentUser: {role}}) => <ReactForm
    onSubmit={submit}
    defaultValues={initialValues()}
    validate={validate}>
    {({submitForm, errors, values}) => {
      return <Form
        success={!!success}
        error={!!error}
        onSubmit={submitForm}>
        {
          Object
            .keys(fields)
            .map(
              field => inputFor(field, errors, fields[field], role)
            )
        }
        <Message success content={!!success && success} />
        <Message error content={!!error && error.map(e => <li>{e}</li>)}/>
        <Button type='submit'>Submit</Button>
      </Form>
    }}
  </ReactForm>

UserForm.contextTypes = {
  currentUser: PropTypes.object
}

export default UserForm;
