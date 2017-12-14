import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class CreateCompetition extends Component {
  constructor(props) {
    super(props);
    this.state = { competition: { name: '' } };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //this.setState({competition: {name: event.target.value}});
  }

  handleSubmit(event) {
    // alert(JSON.stringify(this.state));

    axios.post('/api/competition', this.state.competition).then(res => {
      //route to newly created competition
    });

    event.preventDefault();
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">New competition</h4>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="newComp">Competition name:</label>

            <div className="input-group">
              <input
                id="newComp"
                type="text"
                className="form-control"
                defaultValue={this.state.competition.name}
                onChange={e =>
                  this.setState({
                    competition: {
                      ...this.state.competition,
                      name: e.target.value
                    }
                  })
                }
              />
              <span className="input-group-btn">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Create"
                />
              </span>
            </div>

            {/*<input type="text" value={this.state.competition.other} onChange={e => this.setState({competition: {...this.state.competition,  other: e.target.value }})} />*/}
          </form>
        </div>
      </div>
    );
  }
}
