import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import React from 'react';

import ajax from '../Shared/ajax';

const htmlToNewWindow = ({html}) => window.open().document.write(html)
const TimeEntryReportButton = ({reload, params}) => <Button
  floated='right'
  onClick={() => reload(params).then(htmlToNewWindow)}
  icon="external"
  content="Export"/>

export default withRouter(ajax({
  url: '/time_entries.html',
  params: ({match}) => !!match.params.userId? {user_id: match.params.userId} : {},
  loadOnMount: false
})(TimeEntryReportButton))
