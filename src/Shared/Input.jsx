import { Form } from 'semantic-ui-react';
import { FormInput } from 'react-form';
import React from 'react';
import VMasker from 'vanilla-masker'

const maskValue = (value, mask) => VMasker.toPattern(value, mask)

export default ({field, mask, ...props}) => (
  <FormInput field={field}>
    {({ setValue, getValue, setTouched }) => (
      <Form.Input
        {...props}
        width={12}
        value={!!mask? maskValue(getValue(''), mask) : getValue('')}
        onChange={(_, {value}) => {return setValue(value)}}
        onBlur={() => setTouched()} />
    )}
  </FormInput>
)
