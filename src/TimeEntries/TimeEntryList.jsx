import { Table } from 'semantic-ui-react';
import React from 'react';

import TimeEntry from './TimeEntry'

export default ({timeEntries, reload}) => <Table celled structured>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
      <Table.HeaderCell rowSpan='2'>Date</Table.HeaderCell>
      <Table.HeaderCell rowSpan='2'>Duration</Table.HeaderCell>
      <Table.HeaderCell colSpan='2'>Actions</Table.HeaderCell>
    </Table.Row>
    <Table.Row>
      <Table.HeaderCell>Edit</Table.HeaderCell>
      <Table.HeaderCell>Remove</Table.HeaderCell>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {timeEntries.map(tm =>
      <TimeEntry key={tm.id} {...tm} remove={reload} />
    )}
  </Table.Body>
</Table>
