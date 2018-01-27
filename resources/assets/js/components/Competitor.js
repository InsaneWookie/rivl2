import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Competitor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competition: {},

      player: {
        id: 0,
        name: '',
        points: 0,
        games: 0,
        winPercentage: 0,
        avatar: 'http://via.placeholder.com/80x80'
      }
    };
  }


  componentWillMount() {

    axios
      .get(`/api/competition/${this.props.competition}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          competition: res.data,
        });
      })
      .catch(error => {
        console.log(error);
      });

    //load all the competitors for this competition
    axios
      .get(`/api/competition/${this.props.competition}/competitor/${this.props.competitor}`)
      .then(res => {
        console.log(res.data);

        let data = res.data;

        data.points = Math.round(data.elo.elo);
        data.games = 123;
        data.winPercentage = 64;
        data.avatar ='http://via.placeholder.com/80x80';

        this.setState({player: data});
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="card main-card mb-4">
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
        <div className="card main-card mb-4">
          <div className="card-body">
            <h4 className="card-title d-flex align-items-center">
              {this.state.competition.name}
            </h4>
            <p>{this.state.player.points} points (2nd)</p>
            <p>
              {this.state.player.games} games ({this.state.player.winPercentage}%
              wins)
            </p>
            <p>
              Main rivl: <a href="#">Some guy</a>
            </p>
            <p>
              <strong>Recent games</strong>
            </p>
            graph here
          </div>
        </div>
        {/* IF has played other sports: */}
        <div className="card main-card mb-4">
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
