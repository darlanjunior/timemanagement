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
}, refreshList, url}) => <Segment>
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
      id={id}
      refreshList={refreshList}/>
    <EndLiveTaskButton
      buttonProps={{
        icon: 'cancel',
        content: 'Cancel',
        negative: true
      }}
      id={id}
      refreshList={refreshList} />
    <Link to={`${url}/live_tasks/edit`.replace(/\/\//g, '/')}>
      <Button
        icon="edit"
        content="Edit" />
    </Link>
  </Segment>


const LiveTask = ({ match, response: { task }, refreshList, reload }) => {
  const createTaskPage = () => <CreateTaskPage refreshLiveTask={reload} />
  const editTaskPage = () => <EditTaskPage task={task} />
  const defaultPage = () => !!task ? <LiveTaskView refreshList={() => {
    reload();
    refreshList();
  }} task={task} url={match.url}/> : null

  return <Switch>
    <Route
      path={`${match.path}/live_tasks/new`.replace(/\/\//g, '/')}
      render={createTaskPage} />
    <Route
      path={`${match.path}/live_tasks/edit`.replace(/\/\//g, '/')}
      render={editTaskPage} />
    <Route
      render={defaultPage} />
  </Switch>
}

export default withRouter(ajax({
  url: '/live_tasks',
  params: ({match}) => !!match.params.userId? {user_id: match.params.userId} : {},
  loadingComponent: <Loader active/>
})(LiveTask))
