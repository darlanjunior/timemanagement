import { Button, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';

import RemoveUserButton from './RemoveUserButton';

export default ({id, attributes: {
  name,
  email,
  role
}, remove
}) => (
  <Table.Row>
    <Table.Cell>{name}</Table.Cell>
    <Table.Cell>{email}</Table.Cell>
    <Table.Cell>{role}</Table.Cell>
    <Table.Cell>
      <Link to={`/users/${id}`}>
        <Button icon='edit'/>
      </Link>
    </Table.Cell>
    <Table.Cell>
      <RemoveUserButton id={id} callback={remove}/>
    </Table.Cell>
  </Table.Row>
)
