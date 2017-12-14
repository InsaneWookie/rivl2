import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import CreateCompetition from './CreateCompetition';

export default class Competitions extends Component {
  render() {
    return (
      <div className="container mb-5">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Competitions</h4>
          </div>
          <ul className="list-group list-group-flush">
            {this.props.competitions.map((item, index) => (
              <li className="list-group-item" key={index}>
                <a href={`#competition/${item.id}`}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <CreateCompetition />
      </div>
    );
  }
}
