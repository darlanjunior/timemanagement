import { Button, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types'

import RemoveUserButton from './RemoveUserButton';

const User = ({id, attributes: {
  name,
  email,
  role
}, remove
}, {currentUser}) => (
  <Table.Row>
    <Table.Cell>
      { currentUser.role === 'Manager' ? name : (
        <Link to={`/users/${id}/time_entries`}>
          {name}
        </Link>
      )}
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

User.contextTypes = {
  currentUser: PropTypes.object
}

export default User;
