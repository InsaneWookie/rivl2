import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
  render() {
    return (
      <nav className="navbar main-nav mb-4">
        <a className="navbar-brand" href="/">
          rivl
        </a>
        <div className="nav-title mr-auto">[Big page heading]</div>
        <a className="btn btn-default" href="/">
          😒
        </a>
      </nav>
    );
  }
}
