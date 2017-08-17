import { Loader, Message, Table } from 'semantic-ui-react';
import React from 'react';

import User from './User';

export default ({users, reload, loading}) => {
  if(loading) return <Loader active />
  if(!users) return <Message error content="An error occurred" />

  return <Table celled structured>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell rowSpan='2'>User</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Email</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Role</Table.HeaderCell>
          <Table.HeaderCell colSpan='2'>Actions</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Edit</Table.HeaderCell>
          <Table.HeaderCell>Remove</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {users.map(u =>
          <User key={u.id} remove={reload} {...u} />
        )}
      </Table.Body>

    </Table>
}
