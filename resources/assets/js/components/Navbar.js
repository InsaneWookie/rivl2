import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-header">

                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#app-navbar-collapse">
                            <span className="sr-only">Toggle Navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                        <a className="navbar-brand" href="/">
                            Rivl 2.0
                        </a>
                    </div>

                    <div className="collapse navbar-collapse" id="app-navbar-collapse">

                        <ul className="nav navbar-nav">
                            <li >
                                EnterGame
                            </li>
                        </ul>


                    </div>
                </div>
            </nav>
        );
    }
}

// if (document.getElementById('nav')) {
//     ReactDOM.render(<Example/>, document.getElementById('nav'));
// }
