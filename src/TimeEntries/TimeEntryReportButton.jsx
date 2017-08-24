import { Button } from 'semantic-ui-react';
import React from 'react';

import ajax from '../Shared/ajax';

const htmlToNewWindow = ({html}) => window.open().document.write(html)
const TimeEntryReportButton = ({reload, params}) => <Button
  floated='right'
  onClick={() => (reload(params).then(htmlToNewWindow)}
  icon="external"
  content="Export"/>

export default ajax({
  url: '/time_entries.html',
  loadOnMount: false
})(TimeEntryReportButton)
