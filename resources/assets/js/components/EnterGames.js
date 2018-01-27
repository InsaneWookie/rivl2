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

    this.setState(prevState => ({
      scores: [
        ...prevState.scores,
        {
          competitor1_id: this.state.selectedPlayer1Id,
          competitor2_id: this.state.selectedPlayer2Id,
          winner: null
        }
      ],

      allEntered: false
    }));
  }

  removeGameRow() {
    let scores = [...this.state.scores];
    scores.pop();
    this.setState({
      scores,
      allEntered: this.getValidScores(scores, this.state.selectedPlayer1Id, this.state.selectedPlayer2Id)
    });
  }

  /**
   * Winner is either 'left' or 'right'
   * */
  setGameWinner(game, winner) {
    let scores = [...this.state.scores];
    scores[game].winner = winner;
    this.setState({
      scores,
      allEntered: this.getValidScores(scores, this.state.selectedPlayer1Id, this.state.selectedPlayer2Id)
    });

  }

  getValidScores(scores, p1, p2) {
    let allEntered = !scores.some((s) => s.winner === null);

    //don't enable the button if they have selected the same person on both sides
    if (p1 === p2 || p1 === '' || p2 === '') {
      return false;
    }

    return allEntered;
  }


  submitScores() {

    //TODO: at the moment the api only handles single game creation. Want to support multiple I think

    //need to convert the UI score format into the api format
    let competitionId = this.state.competitionId;

    let requests = [];

    this.state.scores.forEach((s) => {

      let game = {
        competition_id: competitionId,
        scores: [
          {
            competitor_id: s.competitor1_id,
            rank: 'left' === s.winner ? 1 : 2,
            score: 'left' === s.winner ? 11 : -1,
            elo_before: 1500,
            elo_after: 1500
          },
          {
            competitor_id: s.competitor2_id,
            rank: 'right' === s.winner ? 1 : 2,
            score: 'right' === s.winner ? 11 : -1,
            elo_before: 1500,
            elo_after: 1500
          }
        ]
      };

      requests.push(axios.post(`/api/competition/${this.state.competitionId}/game`, game));

    });

    Promise.all(requests).then(console.log);

  }


  rebuildScores(scores, competitor1Id, competitor2Id) {

    scores.forEach((s) => {
      s.competitor1_id = competitor1Id;
      s.competitor2_id = competitor2Id;
    });

    return scores;
  }

  handlePlayer1Change(e) {
    let selectedPlayerId = e.target.value;
    let newScores = this.rebuildScores([...this.state.scores], selectedPlayerId, this.state.selectedPlayer2Id);
    let allEntered = this.getValidScores(newScores, selectedPlayerId, this.state.selectedPlayer2Id);

    this.setState((prevState) => ({
      selectedPlayer1Id: selectedPlayerId,
      scores: newScores,
      allEntered: allEntered
    }));
  }

  handlePlayer2Change(e) {
    let selectedPlayerId = e.target.value;

    let newScores = this.rebuildScores([...this.state.scores], this.state.selectedPlayer1Id, selectedPlayerId);
    let allEntered = this.getValidScores(newScores, this.state.selectedPlayer1Id, selectedPlayerId);

    this.setState((prevState) => ({
      selectedPlayer2Id: selectedPlayerId,
      scores: newScores,
      allEntered: allEntered
    }));
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
              {/*<span className="input-group-addon bg-light">*/}
              {/*{Object.keys(this.state.gameResults).length}*/}
              {/*</span>*/}
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
              onClick={this.submitScores}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
