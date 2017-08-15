import React from 'react'
import PropTypes from 'prop-types'
import { api } from './api';
import _ from 'lodash';

export default ({
  url,
  params = {},
  loadOnMount = true,
  loadingComponent,
  errorComponent
}) => {
  if(!url) throw new Error('URL is required')

  return Component => {
    class Ajax extends React.Component {
      state = {
        loading: loadOnMount,
        error: false,
        response: {},
        manualTrigger: false
      }

      componentDidMount() {
        // prevent loadOnMount + manualTrigger => double fetch
        if(loadOnMount && !this.state.manualTrigger) {
          return this.fetchData()
        }
      }

      setLoadedState = json => {
        this.setState({
          loading: false,
          response: json,
          manualTrigger: false
        })

        return json
      }

      setErrorState = error => {
        this.setState({
          loading: false,
          error: true,
          response: error,
          manualTrigger: false
        })

        return error.response
      }

      urlEndpoint = () => this.context.urlEndpoint

      fetchData(aditionalParams={}, method='get', path='') {
        this.setState({loading: true})

        return api(`${this.urlEndpoint()||''}${url}${path}`, {...params, ...aditionalParams}, method)
          .then(this.setLoadedState.bind(this))
          .catch(this.setErrorState.bind(this))
      }

      render() {
        const { loading, error } = this.state
        const reload = (params, method, path) => {
          this.setState({manualTrigger: true})
          return this.fetchData(params, method, path)
        }

        if(loading && !!loadingComponent) return loadingComponent
        if(error && !!errorComponent) return errorComponent
        return <Component
          {..._.omit(this.state, ['manualTrigger']) }
          {...{reload}}
          {...this.props} />
      }
    }
    Ajax.contextTypes = {
      urlEndpoint: PropTypes.string
    };

    return Ajax
  }
}
