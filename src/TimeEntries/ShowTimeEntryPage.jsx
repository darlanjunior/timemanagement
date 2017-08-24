import { Header, List, Loader, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import NoteForm from './NoteForm';
import RemoveNoteButton from './RemoveNoteButton';
import ajax from '../Shared/ajax';

class ShowTimeEntryListPage extends Component {
  render() {
    const {
      name,
      description,
      duration,
      date,
      notes
    } = this.props.response.data.attributes
    const timeEntryId = this.props.match.params.id

    return (
      <Segment>
        <h2>Task {name}</h2>
        <List>
          <List.Item>
            <List.Header>Description</List.Header>
            {description}
          </List.Item>
          <List.Item>
            <List.Header>Duration</List.Header>
            {duration}
          </List.Item>
          <List.Item>
            <List.Header>Date</List.Header>
            {date}
          </List.Item>
        </List>
        <List divided relaxed>
          <Header as='h3'>Notes</Header>
          {
            notes.map(({id, text}) => <List.Item>
              <RemoveNoteButton
                id={id}
                callback={() => this.props.reload()}
                timeEntryId={timeEntryId} />
              <List.Content>{text}</List.Content>
            </List.Item>)
          }
        </List>
        <NoteForm timeEntryId={timeEntryId} submit={(note) => this.props.reload()}/>

      </Segment>
    )
  }
}

export default withRouter(ajax({
  url: ({match}) => `/time_entries/${match.params.id}`,
  loadingComponent: <Loader active />
})(ShowTimeEntryListPage))

//this.setState({
  // notes: [...addNotes, {id: null, text: note}]
// }
