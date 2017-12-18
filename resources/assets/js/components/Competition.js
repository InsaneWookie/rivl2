import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

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

export default class Competition extends Component {
  showMore(e) {
    e.preventDefault();
    console.log('cats');
  }

  render() {
    return (
      <div>
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title mb-0">Leaderboard</h4>
          </div>
          <ul className="list-group list-group-flush">
            {Object.keys(competitors).map((key, index) => (
              <li
                className="list-group-item d-flex align-items-center"
                key={index}
              >
                <div className="position mr-3">1st</div>
                <Link to="/competitor">
                  <img
                    className="avatar avatar-r avatar-sm mr-3"
                    src={competitors[key].avatar}
                  />
                </Link>
                <div className="name">
                  <Link to="/competitor">{competitors[key].name}</Link>
                </div>
                <div className="points ml-auto">{competitors[key].points}</div>
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

        <div className="card mb-4">
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

        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title">Add a player</h4>
            ...how?
          </div>
        </div>
      </div>
    );
  }
}
