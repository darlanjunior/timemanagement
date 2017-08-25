import { Button, Table } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import React from 'react';

import RemoveTimeEntryButton from './RemoveTimeEntryButton';

const TimeEntry = ({
  id,
  remove,
  match,
  attributes: {
    name,
    date,
    duration,
    green
  }
}) => (
  <Table.Row positive={green} negative={!green}>
    <Table.Cell>
      <Link to={`${match.url.replace('/time_entries', '')}/time_entries/${id}/show`.replace(/\/\//g, '/')}>
        {name}
      </Link>
    </Table.Cell>
    <Table.Cell>{date}</Table.Cell>
    <Table.Cell>{duration}</Table.Cell>
    <Table.Cell>
      <Link to={`${match.url}/${id}`.replace(/\/\//g, '/')}>
        <Button icon='edit' fluid/>
      </Link>
    </Table.Cell>
    <Table.Cell>
      <RemoveTimeEntryButton id={id} callback={remove}/>
    </Table.Cell>
  </Table.Row>
)

export default withRouter(TimeEntry)
