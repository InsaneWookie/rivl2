import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Competitor extends Component {
  render() {
    return (
      <div className="container mb-5">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">[Competitor name]</h4>
            <p>I am a competitor!</p>
          </div>
        </div>
      </div>
    );
  }
}
