import axios from 'axios';

export default class GameController {

  static createGame(competitionId, gameId, scores) {

    let newGame = {
      scores: scores
    };

    axios.post(`/api/competition/${competitionId}/game`, newGame)
  }
}