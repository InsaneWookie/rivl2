import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Example extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-faded">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/competitions" onClick={() => this.props.setCompetition(null)}>Competitions</Link>
              {this.props.selectedCompetition && <Link className="nav-item nav-link" to={`/competition/${this.props.selectedCompetition.id}/enter-scores`}>Enter Games</Link>}
          </div>
        </div>
      </nav>
    );
  }
}
