import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Navbar from './Navbar';
import Competitions from './Competitions';

export default class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            competitions: [{name: 'test'}],
        };
    }

    render() {
        return (
            <div>
                <div id="nav">
                    <Navbar />
                </div>
                <div id="content">
                    <Competitions competitions={this.state.competitions} />
                </div>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Layout/>, document.getElementById('root'));
}
