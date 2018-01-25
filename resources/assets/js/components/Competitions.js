import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import CreateCompetition from './CreateCompetition';

export default class Competitions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="card main-card mb-4">
          <div className="card-body">
            <h4 className="card-title">Competitions</h4>
          </div>
          <ul className="list-group list-group-flush">
            {this.props.competitions.map((item, index) => (
              <li className="list-group-item" key={index}>
                <Link to={`/competition/${item.id}`} onClick={() => this.props.setCompetition(item)}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <CreateCompetition />
      </div>
    );
  }
}
