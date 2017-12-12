import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

import Navbar from './Navbar';
import Competitions from './Competitions';
import CreateCompetition from "./CreateCompetition";

export default class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            competitions: [],
        };
    }

    componentDidMount() {
        axios.get(`/api/competition`)
            .then(res => {
                this.setState({ competitions: res.data });
            });
    }

    render() {
        return (
            <div>
                <div id="nav">
                    <Navbar />
                </div>
                <div id="content">
                    {/*<Competitions competitions={this.state.competitions} />*/}
                    <CreateCompetition />
                </div>
            </div>
        );
    }
}


if (document.getElementById('root')) {
    ReactDOM.render(<Layout/>, document.getElementById('root'));
}
