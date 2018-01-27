import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
      competitions: [],
      selectedCompetition: null
    };

    this.setCompetition = this.setCompetition.bind(this);
    this.createCompetition = this.createCompetition.bind(this);
  }

  setCompetition(competition){
    this.setState({selectedCompetition: competition});
  }

  getCompetition(competitionId){
    debugger;
    return this.state.competitions.find((c) => c.id = competitionId)
  }

  createCompetition(competition){
    axios.post('/api/competition', competition).then(res => {
      //route to newly created competition
      this.setState((preState) => ({
        competitions: [...preState.competitions, res.data]
      }))

    });
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
              <Link to="/competitions" onClick={() => this.setCompetition(null)}>Competitions</Link>
              |
              {this.state.selectedCompetition && <Link to={`/competition/${this.state.selectedCompetition.id}/enter-scores`}>Enter Games</Link>}
            </div>

            <Switch>
              <Route exact
                path="/competitions"
                render={() => <Competitions competitions={this.state.competitions} setCompetition={this.setCompetition} createCompetition={this.createCompetition} />}
              />
              <Route exact
                path="/competition/:id"
                render={(routeProps) => <Competition competition={routeProps.match.params.id} />}
              />
              <Route exact
                path="/competition/:competitionId/enter-scores"
                render={(routeProps) => <EnterGames competitionId={routeProps.match.params.competitionId}/>}
              />
              <Route exact
                path="/competition/:competitionId/competitor/:id"
                render={(routeProps) => <Competitor competition={routeProps.match.params.competitionId} competitor={routeProps.match.params.id}/>}
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
