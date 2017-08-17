import { Dropdown, Menu, Segment } from 'semantic-ui-react';
import React from 'react';
import _ from 'lodash'

const buildPageRange = (page, pageCount) => {
  const from = Math.max(1, page-2)
  const to = Math.min(pageCount, from+4)

  return _.range(from, to+1)
}

export default ({page, items_per_page, count, changePage}) => {
  const goTo = p => () => changePage({page: p})
  const menuItem = p => <Menu.Item
    key={p}
    name={`${p}`}
    active={p === page}
    onClick={goTo(p)} />

  const pageCount = Math.ceil(count/items_per_page)
  const pageRange = buildPageRange(page, pageCount)

  return (<Segment>
    <Dropdown
      placeholder='Items per page'
      selection
      defaultValue={items_per_page}
      onChange={(e, {value}) => {
        changePage({
          page: 1,
          items_per_page: value
        })
      }}
      options={[
        {text: '5 items per page', value: 5},
        {text: '10 items per page', value: 10},
        {text: '15 items per page', value: 15},
        {text: '20 items per page', value: 20}
      ]}/>
    <Menu pagination floated='right'>
      {
        page === 1 ? null :
        <Menu.Item icon='arrow left' onClick={goTo(page-1)}/>
      }
      {pageRange.map((i) => menuItem(i))}
      {
        page === pageCount ? null :
        <Menu.Item icon='arrow right' onClick={goTo(page+1)}/>
      }
    </Menu>
  </Segment>)
}
