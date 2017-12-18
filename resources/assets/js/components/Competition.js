import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Competition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competitors: [],
      isLoading: true
    };
  }

  componentWillMount() {
    axios
      .get(`/api/competition/${this.props.competition}/competitor`)
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

  showMore(e) {
    e.preventDefault();
    console.log('cats');
  }

  render() {
    return (
      <div>
        <div className="card main-card mb-4">
          <div className="card-body">
            <h4 className="card-title mb-0">Leaderboard</h4>
          </div>
          <ul className="list-group list-group-flush">
            {this.state.isLoading === true && (
              <li className="list-group-item">[spinner]</li>
            )}
            {this.state.competitors.map(competitor => (
              <li
                className="list-group-item d-flex align-items-center"
                key={competitor.id}
              >
                <div className="position mr-3">1st</div>
                <Link to="/competitor">
                  <img
                    className="avatar avatar-r avatar-sm mr-3"
                    src="http://via.placeholder.com/80x80"
                  />
                </Link>
                <div className="name">
                  <Link to="/competitor">{competitor.name}</Link>
                </div>
                <div className="points ml-auto">
                  {Math.round(competitor.elo.elo)}
                </div>
              </li>
            ))}

            <li className="list-group-item text-center">
              <a
                href="#"
                onClick={this.showMore}
                className="leaderboard-show-more"
              >
                Show more &#9662;
              </a>
            </li>
          </ul>
        </div>

        <div className="card main-card mb-4">
          <div className="card-body">
            <h4 className="card-title mb-0">Recent results</h4>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="row">
                <div className="col-5">
                  <Link to="/competitor">Liam Johnston</Link>
                </div>
                <div className="col-2 text-center text-nowrap">2 - 1</div>
                <div className="col-5 text-right">
                  <Link to="/competitor">Rowan Tate</Link>
                </div>
              </div>
            </li>

            <li className="list-group-item">
              <div className="row">
                <div className="col-5">
                  <Link to="/competitor">Avi Mishra</Link>
                </div>
                <div className="col-2 text-center text-nowrap">5 - 0</div>
                <div className="col-5 text-right">
                  <Link to="/competitor">Jonathan Bartlett</Link>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="card main-card mb-4">
          <div className="card-body">
            <h4 className="card-title">Add a player</h4>
            ...how?
          </div>
        </div>
      </div>
    );
  }
}
