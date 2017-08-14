import { Icon, Item, Menu as SemanticMenu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';

export default () => (
  <SemanticMenu>
    <Item>
      <Link to="/">
        <Icon name='home' />
        Home
      </Link>
    </Item>
  </SemanticMenu>
)
