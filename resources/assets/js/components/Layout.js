import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import axios from 'axios';

import Navbar from './Navbar';
import Competitions from './Competitions';
import Competition from './Competition';
import EnterGames from './EnterGames';
import Competitor from './Competitor';

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {
      competitions: []
    };
  }

  componentWillMount() {
    axios.get(`/api/competition`).then(res => {
      this.setState({ competitions: res.data });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <div className="container">
            <div className="alert alert-info">
              TEST LINKS:<br />
              <Link to="/home">Competitions</Link>
              |
              <Link to="/competition:1">Competition</Link>
              |
              <Link to="/competition/1/enter-scores">Enter Games</Link>
              |
              <Link to="/competition/1/competitor">Competitor</Link>
              |
            </div>

            <Route
              path="/home"
              render={() => (
                <Competitions competitions={this.state.competitions} />
              )}
            />
            {/*
              TODO: sort this out... URL should be like e.g. competition/5
              Cmpetiton.js currently expects a 'competition' prop to make its API call
            */}
            <Route
              path="/competition:id"
              render={() => <Competition competition={1} />}
            />
            {/*
              ditto similar issue here:
            */}
            <Route
              path="/competition/1/enter-scores"
              render={() => <EnterGames />}
            />
            {/*
              and here:
            */}
            <Route
              path="/competition/1/competitor"
              render={() => <Competitor />}
            />
          </div>
        </div>
      </Router>
    );
  }
}

if (document.getElementById('root')) {
  ReactDOM.render(<Layout />, document.getElementById('root'));
}
