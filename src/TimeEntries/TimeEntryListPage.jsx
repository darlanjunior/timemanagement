import { Button, Loader } from 'semantic-ui-react';
import { DateRangePicker } from 'react-dates';
import { Link, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import CreateTimeEntryPage from './CreateTimeEntryPage';
import EditTimeEntryPage from './EditTimeEntryPage';
import LiveTask from './LiveTask/LiveTask';
import TimeEntryList from './TimeEntryList';
import TimeEntryReportButton from './TimeEntryReportButton';
import ajax from '../Shared/ajax';

class TimeEntryListPage extends Component {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null
  }

  render () {
    const {match, loading, response: {data}, reload} = this.props
    const creationPage = () => <CreateTimeEntryPage refreshList={() => reload()}/>
    const editingPage = () => <EditTimeEntryPage refreshList={() => reload()} timeEntries={data}/>

    return <div>
      <Switch>
        <Route
          exact
          path={`${match.url}/new`}
          render={creationPage} />
        <Route
          exact
          path={`${match.url}/:id`}
          render={editingPage}/>
      </Switch>

      <LiveTask />
      <h2>Time Entries</h2>
      <TimeEntryReportButton params={this.state} />
      <DateRangePicker
        {...this.state}
        enableOutsideDays
        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate }, () => reload({ startDate, endDate }))}
        onFocusChange={focusedInput => this.setState({ focusedInput })}
      />
      {loading? <Loader active/> : <TimeEntryList timeEntries={data} {...{reload}}/>}
      <Link to={`/time_entries/new`}>
        <Button
          icon="add"
          content="Create Time Entry"
          floated="right"/>
      </Link>
      <Link to={`/time_entries/live_tasks/new`}>
        <Button
          icon="clock"
          content="Start Ongoing Task"
          floated="right"/>
      </Link>
    </div>
  }

}


export default ajax({
  url: '/time_entries'
})(TimeEntryListPage)
