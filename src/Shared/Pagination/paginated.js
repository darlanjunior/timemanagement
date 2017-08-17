import { Component } from 'react';

export default Component => class Paginated extends Component {
  

  render() {
    return <Component {...this.props}/>
  }
}
