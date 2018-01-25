import React, {Component} from 'react';
import axios from 'axios';
import EnterGameRow from './EnterGameRow';

import GameController from '../controllers/GameController';

export default class EnterGames extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
     // competition: props.competition,
      competitionId: props.competitionId,
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
      },
      scores: [
        // {competitor1_id: 1, competitor2_id: 2, winner: 1}
      ],

      selectedPlayer1Id: '',
      selectedPlayer2Id: ''

    };

    this.addGameRow = this.addGameRow.bind(this);
    this.removeGameRow = this.removeGameRow.bind(this);
    this.setGameWinner = this.setGameWinner.bind(this);
    this.checkAllEntered = this.checkAllEntered.bind(this);
    this.submitScores = this.submitScores.bind(this);
    this.handlePlayer1Change = this.handlePlayer1Change.bind(this);
    this.handlePlayer2Change = this.handlePlayer2Change.bind(this);
  }

  componentWillMount() {

    //load all the competitors for this competition
    axios
      .get(`/api/competition/${this.state.competitionId}/competitor`)
      .then(res => {
        this.setState({
          competitors: res.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  addGameRow() {
    // const count = Object.keys(this.state.gameResults).length;
    // const results = this.state.gameResults;
    // results[count + 1] = 0;
    //
    // this.setState({
    //   gameResults: results,
    //   allEntered: false
    // });

    this.setState(prevState => ({
      scores: [...prevState.scores, {
        competitor1_id: this.state.selectedPlayer1Id,
        competitor2_id: this.state.selectedPlayer2Id,
        winner: null}],

      allEntered: false
    }))
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
    console.log({game}, {winner});

    // const results = this.state.gameResults;
    // results[game] = winner;
    //
    //
    // this.setState({
    //   gameResults: results
    // });



    let scores = [...this.state.scores];     // create the copy of state array
    scores[game].winner = winner;                  //new value
    this.setState({ scores });            //update the value

    this.checkAllEntered();
  }

  checkAllEntered() {
    let allEntered = this.state.scores.some((s) => s.winner !== null);
    this.setState({allEntered});

    // if (Object.values(this.state.gameResults).includes(0)) {
    //   this.setState({allEntered: false});
    // } else {
    //   this.setState({allEntered: true});
    // }
  }

  submitScores() {
    //TODO: needs some thought
    // let rivlScores = [];
    //
    // this.state.scores.forEach((s) => {
    //   rivlScores.push({
    //     competitor_id: s.winner,
    //     rank: s.competitor1_id === s.winner ? 11 : 0,
    //     score: s.competitor1_id === s.winner ? 11 : 0
    //   }) ;
    //   rivlScores.push({
    //     competitor_id: s.winner,
    //     rank: s.competitor2_id === s.winner ? 11 : 0,
    //     score: s.competitor2_id === s.winner ? 1 : 2
    //   }) ;
    // });
    //
    // let data = {
    //   "competition_id": this.state.competitionId,
    //   "scores": [{
    //     "competitor_id": 1,
    //     "rank": 1,
    //     "score": 4,
    //     "elo_before": 123,
    //     "elo_after": 321}]
    // };
    //
    // axios.post(`/api/competition/${this.state.competitionId}/game`, data)
  }

  handlePlayer1Change(e){
    this.setState({selectedPlayer1Id: e.target.value});
  }

  handlePlayer2Change(e){
    this.setState({selectedPlayer2Id: e.target.value});
  }

  render() {
    return (
      <div className="card main-card mb-4">
        <div className="card-body">
          <h4 className="card-title">Enter scores</h4>
          <div className="row mt-4">
            <div className="col-6">
              <label htmlFor="player-1">Player 1</label>
              <select className="form-control" name="player-1" id="player-1"
                      value={this.state.selectedPlayer1Id} onChange={this.handlePlayer1Change}>
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
              <select className="form-control" name="player-2" id="player-2"
                      value={this.state.selectedPlayer2Id} onChange={this.handlePlayer2Change}>
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
            <br/>
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
            {this.state.scores.map((score, index) => (
              <EnterGameRow
                setGameWinner={this.setGameWinner}
                key={index}
                score={score}
                game={index}
              />
            ))}
          </div>

          <div className="text-center mt-4">
            <button
              className="btn btn-success btn-block btn-inline-sm"
              disabled={!this.state.allEntered}
              onSubmit={this.submitScores}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
