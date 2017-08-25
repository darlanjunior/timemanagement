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
    <Table.Cell>
      <Link to={`/users/${id}/time_entries`}>
        {name}
      </Link>
    </Table.Cell>
    <Table.Cell>{email}</Table.Cell>
    <Table.Cell>{role}</Table.Cell>
    <Table.Cell>
      <Link to={`/users/${id}`}>
        <Button icon='edit' fluid/>
      </Link>
    </Table.Cell>
    <Table.Cell>
      <RemoveUserButton id={id} callback={remove}/>
    </Table.Cell>
  </Table.Row>
)
