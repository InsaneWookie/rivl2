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

  getDefaultStats(stat, comp){
    if(!stat){
      stat = { competitor_id: comp.id, wins: 0, losses: 0, games_played: 0}
    }
    stat.winPercentage = stat.games_played === 0 ? 0 : Math.round(stat.wins / stat.games_played * 100);

    return stat;
  }

  componentWillMount() {
    let requests = [
      axios.get(`/api/competition/${this.props.competition}/competitor`),
      axios.get(`/api/competition/${this.props.competition}/competitor_stats`),
      axios.get(`/api/competition/${this.props.competition}/game`)
    ];

    Promise.all(requests).then(results => {

      let competitors = results[0].data;
      let stats = results[1].data;
      let games = results[2].data;

      //populate the competior stats info
      competitors.forEach(comp => {
        let stat = _.find(stats, {'competitor_id': comp.id});
        stat = this.getDefaultStats(stat, comp);
        comp.stats = stat;
      });

      this.setState({
        convertedGames: this.convertGamesToUIStructure(games, competitors),
        competitors: this.setCompetitorRank(this.sortCompetitors(competitors)),
        isLoading: false
      });
    })
  }


  sortCompetitors(competitors) {

    return _.orderBy(competitors, [(comp) => {
      return parseFloat(comp.elo.elo);
    }], ['desc']).filter((c) => c.elo.status === 'active');
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
        let newCompetitor = res.data;
        newCompetitor.stats = this.getDefaultStats(null, newCompetitor);
        let newComps = this.setCompetitorRank([...this.state.competitors, res.data]);
        this.setState({competitors: newComps});
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
            <form className="form-inline">
              <input className="form-control col mr-sm-2" type="text" name="player_name" placeholder="name"
                     onChange={e => this.setState({player_name: e.target.value})}/>
              <input className="form-control col mr-sm-2" name="player_email" placeholder="email"
                     onChange={e => this.setState({player_email: e.target.value})}/>
              <button className="btn btn-primary col" onClick={this.handleAddPlayer}>Add</button>
            </form>
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
                <div className="name mr-3">
                  <Link
                    to={`/competition/${this.props.competition}/competitor/${competitor.id}`}>{competitor.name}</Link>

                </div>
                <div className="points mr-3">
                  {Math.round(competitor.elo.elo)}
                </div>
                <div className="points ml-auto">
                   (Wins: {competitor.stats.wins}@{competitor.stats.winPercentage}%)
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
