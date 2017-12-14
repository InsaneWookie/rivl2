import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Competitor extends Component {
  constructor() {
    super();

    this.state = {
      competitionName: 'Table tennis',
      player: {
        name: 'Liam Johnston',
        id: 111,
        points: 1655,
        games: 666,
        winPercentage: 64,
        avatar: 'http://via.placeholder.com/80x80'
      }
    };
  }

  render() {
    return (
      <div>
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title d-flex align-items-center mb-0">
              <img
                src={this.state.player.avatar}
                alt={`${this.state.player.name}'s avatar'`}
                className="avatar mr-4"
              />
              {this.state.player.name}
            </h4>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title d-flex align-items-center">
              {this.state.competitionName}
            </h4>
            <p>{this.state.player.points} points (2nd)</p>
            <p>
              {this.state.player.games} games ({this.state.player.winPercentage}%
              wins)
            </p>
            <p>
              Main rivl: <a href="#">Some guy</a>
            </p>
            <h3>Recent games</h3>
            graph here
          </div>
        </div>
        {/* IF has played other sports: */}
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title d-flex align-items-center">
              Other stats
            </h4>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <a href="#">Some other sport</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
