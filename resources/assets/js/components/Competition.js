import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import RecentResults from "./RecentResults";

export default class Competition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competitors: [],
      convertedGames: [],
      isLoading: true,
      player_name: '',
      player_email: ''
    };

    //this is BS having to bind evey event handler function
    this.handleAddPlayer = this.handleAddPlayer.bind(this);
    this.convertGamesToUIStructure = this.convertGamesToUIStructure.bind(this);


  }

  componentWillMount() {
    axios
      .get(`/api/competition/${this.props.competition}/competitor`)
      .then(res => {

        let comp = res.data;

        axios
          .get(`/api/competition/${this.props.competition}/game`)
          .then(res => {

            this.setState({
              convertedGames: this.convertGamesToUIStructure(res.data, comp),
              competitors: this.setCompetitorRank(this.sortCompetitors(comp)),
              isLoading: false
            });

          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }


  sortCompetitors(competitors) {

    return _.orderBy(competitors, [(comp) => {
      return comp.elo.elo;
    }], ['desc']).filter((c) => c.status === 'active');
  }

  setCompetitorRank(competitors) {
    competitors.forEach((comp, index) => {
      comp.rank = index + 1;
    });
    return competitors;
  }

  handleAddPlayer(event) {
    axios.post(`/api/competition/${this.props.competition}/competitor`, {
      name: this.state.player_name,
      email: this.state.player_email
    })
      .then(res => {
        let newComp = [...this.state.competitors, res.data];
        this.setState({competitors: newComp});
      });

    event.preventDefault();
  }


  convertGamesToUIStructure(games, competitors) {

    //we want the player and the number of games they won
    //to get this we group the games by date (date isn't perfect as they can hit a second boundary)
    //and reduce the scores down to a count

    //first sort by date desc (newest first)
    games = _.orderBy(games, [(g) => {
      return g.created_at;
    }], ['desc']);


    //group the games by date
    let groupedGames = {};
    games.forEach((g) => {

      if (groupedGames[g.created_at] === undefined) {
        groupedGames[g.created_at] = [];
      }

      groupedGames[g.created_at].push(g);
    });

    console.log(groupedGames);

    let recentGames = [];

    Object.keys(groupedGames).forEach((key, i) => {
      let games = groupedGames[key];

      let winCount = {};
      games.forEach((g) => {
        let winner = g.scores.find((s) => s.rank === 1);
        let loser = g.scores.find((s) => s.rank !== 1);

        if (winCount[winner.competitor_id] === undefined) {
          winCount[winner.competitor_id] = 0
        }

        winCount[winner.competitor_id]++;

        if (winCount[loser.competitor_id] === undefined) {
          winCount[loser.competitor_id] = 0;
        }
      });

      console.log(winCount);

      let players = Object.keys(winCount);

      let player1 = competitors.find((p) => p.id === parseInt(players[0]));
      let player2 = competitors.find((p) => p.id === parseInt(players[1]));

      //hopefully the keys are in order
      player1.winCount = winCount[player1.id];
      player2.winCount = winCount[player2.id];

      recentGames.push({
        player1: Object.assign({}, player1),
        player2: Object.assign({}, player2)
      })
    });


    console.log(recentGames);


    return recentGames;

  }

  getGetOrdinal(n) {
    let s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  render() {
    return (
      <div>
        <div className="card main-card mb-4">
          <div className="card-body">
            <h4 className="card-title">Add a player</h4>
            <input type="text" name="player_name" placeholder="name"
                   onChange={e => this.setState({player_name: e.target.value})}/>
            <input name="player_email" placeholder="email"
                   onChange={e => this.setState({player_email: e.target.value})}/>
            <button onClick={this.handleAddPlayer}>Add</button>
          </div>
        </div>
        <div className="card main-card mb-4">
          <div className="card-body">
            <h4 className="card-title mb-0">Leaderboard</h4>
          </div>
          <ul className="list-group list-group-flush">
            {this.state.competitors.map(competitor => (
              <li
                className="list-group-item d-flex align-items-center"
                key={competitor.id}
              >
                <div className="position mr-3">{this.getGetOrdinal(competitor.rank)}</div>
                <Link to={`/competition/${this.props.competition}/competitor/${competitor.id}`}>
                  <img
                    className="avatar avatar-r avatar-sm mr-3"
                    src={competitor.avatar_image}
                  />
                </Link>
                <div className="name">
                  <Link
                    to={`/competition/${this.props.competition}/competitor/${competitor.id}`}>{competitor.name}</Link>
                </div>
                <div className="points ml-auto">
                  {Math.round(competitor.elo.elo)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <RecentResults competition={this.props.competition} competitors={this.state.competitors}
                       games={this.state.convertedGames}/>
      </div>
    );
  }
}
