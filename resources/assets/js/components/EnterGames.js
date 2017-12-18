import React, { Component } from 'react';
import axios from 'axios';
import EnterGameRow from './EnterGameRow';

export default class EnterGames extends Component {
  constructor() {
    super();

    this.state = {
      competitors: [],
      isLoading: true,
      allEntered: false,
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
    this.checkAllEntered = this.checkAllEntered.bind(this);
    this.submitScores = this.submitScores.bind(this);
  }

  componentWillMount() {
    axios
      .get(`/api/competition/1/competitor`)
      .then(res => {
        this.setState({
          competitors: res.data.competitors,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  //TODO: this seems cleaner than remembering to call it all over the place,
  //      but it spazzed out when i tried it

  // componentDidUpdate() {
  //   this.checkAllEntered();
  // }

  addGameRow() {
    const count = Object.keys(this.state.gameResults).length;
    const results = this.state.gameResults;
    results[count + 1] = 0;

    this.setState({
      gameResults: results,
      allEntered: false
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

    this.checkAllEntered();
  }

  setGameWinner(game, winner) {
    console.log({ game }, { winner });

    const results = this.state.gameResults;
    results[game] = winner;

    //is this mutating state...?
    this.setState({
      gameResults: results
    });

    this.checkAllEntered();
  }

  checkAllEntered() {
    if (Object.values(this.state.gameResults).includes(0)) {
      this.setState({ allEntered: false });
    } else {
      this.setState({ allEntered: true });
    }
  }

  submitScores() {
    console.log('todo');
  }

  render() {
    return (
      <div className="card main-card mb-4">
        <div className="card-body">
          <h4 className="card-title">Enter scores</h4>
          <div className="row mt-4">
            <div className="col-6">
              <label htmlFor="player-1">Player 1</label>
              <select className="form-control" name="player-1" id="player-1">
                <option value="">Dropdowns suck</option>
                {this.state.isLoading === true && <option>Loading...</option>}
                {this.state.competitors.map(competitor => (
                  <option value={competitor.id} key={competitor.id}>
                    {competitor.name}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="col-2 text-center">VS</div> */}
            <div className="col-6 text-right">
              <label htmlFor="player-2">Player 2</label>
              <select className="form-control" name="player-2" id="player-2">
                <option value="">Dropdowns suck</option>
                {this.state.isLoading === true && <option>Loading...</option>}
                {this.state.competitors.map(competitor => (
                  <option value={competitor.id} key={competitor.id}>
                    {competitor.name}
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
            <button
              className="btn btn-success btn-block btn-inline-sm"
              disabled={!this.state.allEntered}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
