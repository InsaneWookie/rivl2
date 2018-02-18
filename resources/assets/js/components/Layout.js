import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, matchPath  } from 'react-router-dom';

import axios from 'axios';

import Navbar from './Navbar';
import Competitions from './Competitions';
import Competition from './Competition';
import EnterGames from './EnterGames';
import Competitor from './Competitor';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competitions: [],
      selectedCompetition: null,
      loading: true
    };

    this.setCompetition = this.setCompetition.bind(this);
    this.createCompetition = this.createCompetition.bind(this);
  }

  setCompetition(competition) {
    this.setState({selectedCompetition: competition});
  }

  getCompetition(competitionId) {
    return this.state.competitions.find((c) => c.id === parseInt(competitionId))
  }

  createCompetition(competition) {
    axios.post('/api/competition', competition).then(res => {
      //route to newly created competition
      this.setState((preState) => ({
        competitions: [...preState.competitions, res.data]
      }))

    });
  }

  componentWillMount() {
    axios.get(`/api/competition`).then(res => {
      //must be a better way than this
      let match = matchPath(location.pathname, {
        path: '/competition/:id',
        exact: false,
        strict: false
      });
      let selectedComp = null;
      if (match && match.path) {
        selectedComp = res.data.find((c) => c.id === parseInt(match.params.id));
      }

      this.setState({
        competitions: res.data,
        selectedCompetition: selectedComp,
        loading: false
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Router>
          <div>
            <div className="container">
              <Navbar />
              <div className="card main-card mb-4">
                <div className="card-body">
                  Loading
                </div>
              </div>
            </div>
          </div>
        </Router>
      )
    }

    return (
      <Router>
        <div>
          <div className="container">
            <Navbar selectedCompetition={this.state.selectedCompetition} setCompetition={this.setCompetition}/>
            <Switch>
              <Route exact
                     path="/competitions"
                     render={() => <Competitions competitions={this.state.competitions}
                                                 setCompetition={this.setCompetition}
                                                 createCompetition={this.createCompetition}/>}
              />
              <Route exact
                     path="/competition/:id"
                     render={(routeProps) => <Competition competition={routeProps.match.params.id}/>}
              />
              <Route exact
                     path="/competition/:competitionId/enter-scores"
                     render={(routeProps) => <EnterGames competitionId={routeProps.match.params.competitionId}/>}
              />
              <Route exact
                     path="/competition/:competitionId/competitor/:id"
                     render={(routeProps) => <Competitor competition={this.state.selectedCompetition}
                                                         competitor={routeProps.match.params.id}/>}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

if (document.getElementById('root')) {
  ReactDOM.render(<Layout />, document.getElementById('root'));
}
