import { Button, Loader, Segment } from 'semantic-ui-react';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import React from 'react';
import moment from 'moment';

import CreateTaskPage from './CreateTaskPage';
import EditTaskPage from './EditTaskPage';
import EndLiveTaskButton from './EndLiveTaskButton';
import ajax from '../../Shared/ajax';

const timeElapsed = start => {
  const diff = moment().diff(moment(start))

  return moment.utc(diff).format("HH:mm")
}

const LiveTaskView = ({task: {
  id,
  name,
  description,
  start
}}) => <Segment>
    <h2>Task in progress</h2>
    <h3>{name}</h3>
    <p>{description}</p>
    <p>Time elapsed: {timeElapsed(start)}</p>
    <EndLiveTaskButton
      buttonProps={{
        icon: 'check',
        content: 'Complete',
        positive: true
      }}
      completeTask
      id={id} />
    <EndLiveTaskButton
      buttonProps={{
        icon: 'cancel',
        content: 'Cancel',
        negative: true
      }}
      id={id} />
    <Link to='/time_entries/live_tasks/edit'>
      <Button
        icon="edit"
        content="Edit" />
    </Link>
  </Segment>


const LiveTask = ({ match, response: { task } }) => {
  const editTaskPage = () => <EditTaskPage task={task} />
  const defaultPage = () => !!task ? <LiveTaskView task={task} /> : null

  return <Switch>
    <Route
      path={`${match.url}/live_tasks/new`}
      component={CreateTaskPage} />
    <Route
      path={`${match.url}/live_tasks/edit`}
      render={editTaskPage} />
    <Route
      render={defaultPage} />
  </Switch>
}

export default withRouter(ajax({
  url: '/live_tasks',
  loadingComponent: <Loader active/>
})(LiveTask))
