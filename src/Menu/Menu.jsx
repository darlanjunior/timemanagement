import { Container, Icon, Item, Menu as SemanticMenu } from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';
import React from 'react';

import TimeEntryListPage from '../TimeEntries/TimeEntryListPage';

export default () => (
  <div>
    <SemanticMenu>
      <Item>
        <Link to="/">
          <Icon name='home' />
          Home
        </Link>
      </Item>
    </SemanticMenu>
    <Container>
      <Route exact path="/" component={TimeEntryListPage} />
    </Container>
  </div>
)
