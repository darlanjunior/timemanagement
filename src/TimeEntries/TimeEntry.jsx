import { Button, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';

export default ({id, attributes: {
  name,
  date,
  duration
}, remove
}) => (
  <Table.Row>
    <Table.Cell>{name}</Table.Cell>
    <Table.Cell>{date}</Table.Cell>
    <Table.Cell>{duration}</Table.Cell>
    <Table.Cell>
      <Link to={`/time_entries/${id}`}>
        <Button icon='edit'/>
      </Link>
    </Table.Cell>
    <Table.Cell>
    </Table.Cell>
  </Table.Row>
)
