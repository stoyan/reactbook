/* @flow */

import React from 'react';

class Wrap extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Wrap
