import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


export default class CreateCompetition extends Component {
    constructor(props) {
        super(props);
        this.state = {competition: { name: ''}};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        //this.setState({competition: {name: event.target.value}});
    }

    handleSubmit(event) {
        // alert(JSON.stringify(this.state));

        axios.post('/api/competition', this.state.competition)
            .then(res => {
                //route to newly created competition

            });

        event.preventDefault();
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">New Competition</div>

                            <div className="panel-body">
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                        Name:
                                        <input type="text" value={this.state.competition.name} onChange={e => this.setState({competition: {...this.state.competition,  name: e.target.value }})} />

                                        {/*<input type="text" value={this.state.competition.other} onChange={e => this.setState({competition: {...this.state.competition,  other: e.target.value }})} />*/}
                                    </label>
                                    <input type="submit" value="Submit" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
