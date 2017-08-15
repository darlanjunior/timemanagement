import { FormInput } from 'react-form';
import { Form } from 'semantic-ui-react';
import React from 'react';

export default ({field, ...props}) => (
  <FormInput field={field}>
    {({ setValue, getValue, setTouched }) => (
      <Form.Input
        {...props}
        width={12}
        value={getValue('')}
        onChange={(_, {value}) => {return setValue(value)}}
        onBlur={() => setTouched()} />
    )}
  </FormInput>
)
