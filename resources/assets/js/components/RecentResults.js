import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

import CreateCompetition from './CreateCompetition';

export default class RecentResults extends Component {
  constructor(props) {
    super(props);

    debugger;
    this.state = {
      competitionId: props.competition,
      games: [],
      competitors: [],

    };


  }

  componentWillReceiveProps(props) {
    this.setState({
      games: props.games,
      competitors: props.competitors
    });
  }


  render() {
    return (
      <div className="card main-card mb-4">
        <div className="card-body">
          <h4 className="card-title mb-0">Recent results</h4>
        </div>
        <ul className="list-group list-group-flush">
          {this.state.games.map((game, index) => (
            <li className="list-group-item" key={index}>
              <div className="row">
                <div className="col-5">
                  <Link to={`/competition/${this.state.competitionId}/competitor/${game.player1.id}`}>{game.player1.name}</Link>
                </div>
                <div className="col-2 text-center text-nowrap">{game.player1.winCount} - {game.player2.winCount}</div>
                <div className="col-5 text-right">
                  <Link to={`/competition/${this.state.competitionId}/competitor/${game.player2.id}`}>{game.player2.name}</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

    );
  }
}
