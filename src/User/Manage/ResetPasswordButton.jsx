import { Button, Loader } from 'semantic-ui-react';
import React from 'react';

import ajax from '../../Shared/ajax';

const ResetPasswordButton = ({id, reload}) => (
  <Button
    content="Reset User Password"
    style={{marginTop: '10px'}}
    onClick={
      () => reload({user_id: id}, 'post', `${id}/reset_password`)
    }
  />
)

export default ajax({
  url: '/users/',
  loadOnMount: false,
  loadingComponent: <Loader active />,
  errorComponent: <div>An error occurred</div>
})(ResetPasswordButton)
