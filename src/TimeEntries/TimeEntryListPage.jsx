import { Button, Form, Loader } from 'semantic-ui-react';
import { DateRangePicker } from 'react-dates';
import { Link, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import _ from 'lodash'

import CreateTimeEntryPage from './CreateTimeEntryPage';
import EditTimeEntryPage from './EditTimeEntryPage';
import LiveTask from './LiveTask/LiveTask';
import PageMenu from '../Shared/Pagination/PageMenu';
import TimeEntryList from './TimeEntryList';
import TimeEntryReportButton from './TimeEntryReportButton';
import ajax from '../Shared/ajax';

class TimeEntryListPage extends Component {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null,
    page: 1,
    items_per_page: 5,
    search_term: ''
  }

  updateSearchTerm(e, target) {
    this.changeResults({search_term: target.value})
  }

  mergeStateWith(params, state={}) {
    return _.omitBy({...state, ...params}, val => !val)
  }

  changeResults(params) {
    const newState = this.mergeStateWith(params, this.state)

    this.setState(newState, _.debounce(
      () => this.props.reload(newState),
      300
    ))
  }

  render () {
    const {
      loading,
      reload,
      response: {
        data,
        meta
      }
    } = this.props

    const {
      page,
      items_per_page
    } = this.state

    const {updateSearchTerm, changeResults, mergeStateWith} = this

    const creationPage = () => <CreateTimeEntryPage refreshList={() => reload(mergeStateWith(this.state))}/>
    const editingPage = () => <EditTimeEntryPage refreshList={() => reload(mergeStateWith(this.state))} timeEntries={data}/>

    return <div>
      <Switch>
        <Route
          exact
          path={`/time_entries/new`}
          render={creationPage} />
        <Route
          exact
          path={`/time_entries/:id`}
          render={editingPage}/>
      </Switch>

      <LiveTask />


      <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div>
        <h2>Time Entries</h2>
        <DateRangePicker
          {..._.pick(this.state, ['startDate', 'endDate', 'focusedInput'])}
          enableOutsideDays
          isOutsideRange={() => false}
          onDatesChange={({ startDate, endDate }) =>
            this.setState({ startDate, endDate },
              () => reload(mergeStateWith({ startDate, endDate }, this.state))
            )
          }
          onFocusChange={focusedInput => this.setState({ focusedInput })}
        />
      </div>

      <div>
        <TimeEntryReportButton params={this.state} />
        <Form.Input
          style={{marginTop: '19px'}}
          placeholder="Search"
          type="text"
          onChange={updateSearchTerm.bind(this)} />
      </div>
    </div>
      {loading? <Loader active/> : <TimeEntryList
        timeEntries={data}
        reload={() => {
          reload(mergeStateWith(this.state))
        }}/>
      }

      <PageMenu
        page={page}
        count={(meta && meta.count) || 0}
        items_per_page={items_per_page}
        changePage={changeResults.bind(this)} />

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
