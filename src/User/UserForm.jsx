import { Button, Form as FormTag, Message } from 'semantic-ui-react';
import { Form as ReactForm } from 'react-form';
import React from 'react';

import Input from '../Shared/Input';

const validate = () => {

}

const formatLabel = (label) => {
  const firstLetter = label.charAt(0).toUpperCase()
  const remainder = label.slice(1).replace('_', ' ')

  return firstLetter+remainder
}

const inputFor = (field, errors, fieldType='text') => (
  <Input
    key={field}
    error={!!errors && !!errors[field]}
    type={fieldType}
    label={formatLabel(field)}
    field={field} />
)

export default ({
  fields,
  initialValues=(() => {}),
  submit,
  success=undefined,
  error=undefined
}) => {
  return <ReactForm
    onSubmit={submit}
    defaultValues={initialValues()}
    validate={validate}>
    {({submitForm, errors, values}) => {
      return <FormTag
        success={!!success}
        error={!!error}
        onSubmit={submitForm}>
        {
          Object
            .keys(fields)
            .map(
              field => inputFor(field, errors, fields[field])
            )
        }
        <Message success content={!!success && success} />
        <Message error content={!!error && error.map(e => <li>{e}</li>)}/>
        <Button type='submit'>Submit</Button>
      </FormTag>
    }}
  </ReactForm>
}
