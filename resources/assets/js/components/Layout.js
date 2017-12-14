import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import axios from 'axios';

import Navbar from './Navbar';
import Competitions from './Competitions';
import Competition from './Competition';
import EnterGames from './EnterGames';
import Competitor from './Competitor';

// const renderMergedProps = (component, ...rest) => {
//   const finalProps = Object.assign({}, ...rest);
//   return React.createElement(component, finalProps);
// };
//
// const PropsRoute = ({ component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={routeProps => {
//         return renderMergedProps(component, routeProps, rest);
//       }}
//     />
//   );
// };

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competitions: []
    };
  }

  componentDidMount() {
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
            TEST LINKS:<br />
            <Link to="/home">Competitions</Link>
            |
            <Link to="/competition">Competition</Link>
            |
            <Link to="/enter-scores">Enter Games</Link>
            |
            <Link to="/competitor">Competitor</Link>
            |
            <hr />
            <Route
              path="/home"
              render={() => (
                <Competitions competitions={this.state.competitions} />
              )}
            />
            <Route
              path="/competition"
              render={() => <Competition competition={1} />}
            />
            <Route path="/enter-scores" render={() => <EnterGames />} />
            <Route path="/competitor" render={() => <Competitor />} />
          </div>
        </div>
      </Router>
    );
  }
}

if (document.getElementById('root')) {
  ReactDOM.render(<Layout />, document.getElementById('root'));
}
