import { Button, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';

import RemoveTimeEntryButton from './RemoveTimeEntryButton';

export default ({id, attributes: {
  name,
  date,
  duration,
  green
}, remove
}) => (
  <Table.Row style={{backgroundColor: green? 'green' : 'red'}}>
    <Table.Cell>{name}</Table.Cell>
    <Table.Cell>{date}</Table.Cell>
    <Table.Cell>{duration}</Table.Cell>
    <Table.Cell>
      <Link to={`/time_entries/${id}`}>
        <Button icon='edit' fluid/>
      </Link>
    </Table.Cell>
    <Table.Cell>
      <RemoveTimeEntryButton id={id} callback={remove}/>
    </Table.Cell>
  </Table.Row>
)
