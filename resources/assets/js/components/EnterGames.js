import React, { Component } from 'react';
import EnterGameRow from './EnterGameRow';

const competitors = {
  1: {
    name: 'Liam Johnston',
    id: 111,
    points: 1655,
    avatar: 'http://via.placeholder.com/80x80'
  },
  2: {
    name: 'Rowan Tate',
    id: 222,
    points: 1615,
    avatar: 'http://via.placeholder.com/80x80'
  },
  3: {
    name: 'Someone else',
    id: 333,
    points: 1155,
    avatar: 'http://via.placeholder.com/80x80'
  },
  4: {
    name: 'Jonathan Bartlett',
    id: 444,
    points: 1050,
    avatar: 'http://via.placeholder.com/80x80'
  },
  5: {
    name: 'Suzy Cato',
    id: 555,
    points: 1323,
    avatar: 'http://via.placeholder.com/80x80'
  }
};

export default class EnterGames extends Component {
  constructor() {
    super();

    this.state = {
      //Format:
      //game# : winner
      //e.g. 1:1, 2:1, 3:2, 4:2
      //We always have at least one row.
      //0 means there is no winner set yet.
      gameResults: {
        1: 0
      }
    };

    this.addGameRow = this.addGameRow.bind(this);
    this.removeGameRow = this.removeGameRow.bind(this);
    this.setGameWinner = this.setGameWinner.bind(this);
  }

  addGameRow() {
    const count = Object.keys(this.state.gameResults).length;
    const results = this.state.gameResults;
    results[count + 1] = 0;

    this.setState({
      gameResults: results
    });
  }

  removeGameRow() {
    const count = Object.keys(this.state.gameResults).length;

    if (count === 1) {
      return false;
    }

    const results = this.state.gameResults;
    delete results[count];

    this.setState({
      gameResults: results
    });
  }

  setGameWinner(game, winner) {
    console.log({ game }, { winner });

    const results = this.state.gameResults;
    results[game] = winner;

    //is this mutating state...?
    this.setState({
      gameResults: results
    });

    console.table(this.state.gameResults);
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Enter scores</h4>
          <div className="row mt-4">
            <div className="col-6">
              <label htmlFor="player-1">Player 1</label>
              <select className="form-control" name="player-1" id="player-1">
                <option value="">Dropdowns suck</option>
                {Object.keys(competitors).map((key, index) => (
                  <option value={competitors[key].id} key={competitors[key].id}>
                    {competitors[key].name}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="col-2 text-center">VS</div> */}
            <div className="col-6 text-right">
              <label htmlFor="player-2">Player 2</label>
              <select className="form-control" name="player-2" id="player-2">
                <option value="">Dropdowns suck</option>
                {Object.keys(competitors).map((key, index) => (
                  <option value={competitors[key].id} key={competitors[key].id}>
                    {competitors[key].name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="counter-wrap text-center my-4">
            <label>Games played</label>
            <br />
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.removeGameRow}
              >
                -
              </button>
              <span className="input-group-addon bg-light">
                {Object.keys(this.state.gameResults).length}
              </span>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.addGameRow}
              >
                +
              </button>
            </div>
          </div>

          <div className="game-rows">
            {Object.keys(this.state.gameResults).map(k => (
              <EnterGameRow
                setGameWinner={this.setGameWinner}
                key={k}
                game={k}
                winner={this.state.gameResults[k]}
              />
            ))}
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-success btn-block btn-inline-sm">
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
