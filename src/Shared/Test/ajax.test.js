import { mount, shallow } from 'enzyme';
import React from 'react';
import PropTypes from 'prop-types'

import ajax from '../ajax';
import * as utils from '../api';

describe('AJAX Higher Order Component', () => {
  const url = '/asdf'
  const params = {a: 'b'}
  const loadOnMount = true
  const LoadingComponent = () => <div></div>
  const ErrorComponent = () => <div></div>

  describe("receives the required params", () => {
    const hoc = (error=true, addParams=false) => ajax({
      url: (error? null : url),
      params: (addParams? params : null),
      loadOnMount,
      loadingComponent: (<LoadingComponent />),
      errorComponent: (<ErrorComponent />)
    })

    it('returns a function', () => (
      expect(hoc(false, true)).toBeInstanceOf(Function)
    ))
    it('throws when url is missing', () => (
      expect(hoc).toThrow('URL is required')
    ))
    it('does not throw when params are missing', () => (
      expect(() => hoc(false)).not.toThrow('URL is required')
    ))
  })

  describe("calls the api", () => {
    beforeEach(() => {
      const response = { a: 'b' }
      const promise = new Promise(resolve => resolve(response))
      utils.api = jest.fn().mockImplementation(() => promise)
    })

    afterEach(() => {
      jest.unmock('../api')
    })

    const Child = (props) => <div></div>
    const Component = ajax({
      url,
      params,
      loadOnMount,
      loadingComponent: (<LoadingComponent />),
      errorComponent: (<ErrorComponent />)
    })(Child)
    const wrapped = shallow(<Component />, { context: { urlEndpoint: 'myendpoint' } })
    const state = wrapped.state()

    it('sets state to loading', () => (
      expect(wrapped.state()).toHaveProperty('loading', true)
    ))
    it('mounts loading component', () => (
      expect(wrapped.find(LoadingComponent)).toHaveLength(1)
    ))
    it('does not render Child', () => (
      expect(wrapped.find(Child)).not.toHaveLength(1)
    ))

    it(`composes the url with urlEndpoint for the api call
        updates loading, error and response states
        hides Loading and shows Child
        passes down state and api trigger to Child`, () => (
      wrapped
        .instance()
        .componentDidMount()
        .then(_ => {
          expect(utils.api).toHaveBeenCalledWith("myendpoint/asdf", {"a": "b"}, 'get')

          expect(wrapped.state()).toMatchObject({
            error: false,
            loading: false,
            response: {a: 'b'}
          })

          expect(wrapped.find(LoadingComponent)).not.toHaveLength(1)
          expect(wrapped.find(Child)).toHaveLength(1)

          expect(wrapped.find(Child).prop('response')).toEqual({a: 'b'})
          expect(wrapped.find(Child).prop('reload')).toBeInstanceOf(Function)
        })
        .catch(err => console.log(err))
    ))
  })

})
