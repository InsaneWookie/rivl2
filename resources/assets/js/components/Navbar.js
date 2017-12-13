import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
  render() {
    return (
      <nav className="navbar bg-light mb-5">
        <a className="navbar-brand" href="/">
          rivl
        </a>
        <a className="btn btn-success" href="/">
          Enter score
        </a>
      </nav>
    );
  }
}

// if (document.getElementById('nav')) {
//     ReactDOM.render(<Example/>, document.getElementById('nav'));
// }
