import React, { Component } from 'react';

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
      gameCount: 1
    };

    this.addGameRow = this.addGameRow.bind(this);
    this.removeGameRow = this.removeGameRow.bind(this);
  }

  addGameRow() {
    const count = this.state.gameCount;
    this.setState({
      gameCount: count + 1
    });
  }

  removeGameRow() {
    const count = this.state.gameCount;
    if (count > 1) {
      this.setState({
        gameCount: count - 1
      });
    }
  }

  setGameWinner(game, winner) {
    console.log({ game }, { winner });
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Enter scores</h4>
          <div className="row mt-4">
            <div className="col-5 pr-0">
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
            <div className="col-2 text-center">VS</div>
            <div className="col-5 pl-0 text-right">
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
                {this.state.gameCount}
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
            {Array.from({ length: this.state.gameCount }, (_, k) => (
              <div className="row my-2" key={k}>
                <div className="col-3 pr-0">
                  <button
                    className="btn btn-secondary btn-block"
                    onClick={() => this.setGameWinner(k + 1, 1)}
                  >
                    Win
                  </button>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center">
                  <strong>Game {k + 1}</strong>
                </div>
                <div className="col-3 pl-0 text-right">
                  <button
                    className="btn btn-secondary btn-block"
                    onClick={() => this.setGameWinner(k + 1, 2)}
                  >
                    Win
                  </button>
                </div>
              </div>
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
