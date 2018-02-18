import React, {Component} from 'react';

export default class EnterGameResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: this.props.games
    }
  }

  getArrow(eloChange){
    if(eloChange > 0){
      return (<img src="/images/icons/arrow-thick-top.svg" alt="icon name" style={{width: 40, height: 40}}/>)
    } else {
      return (<img src="/images/icons/arrow-thick-bottom.svg" alt="icon name" style={{width: 40, height: 40}} />)
    }

  }

  render() {
    if (this.props.games.left) {
      return (
      <div className="row my-2">
        <div className="col-3 pr-0">
          {this.getArrow(this.props.games.left.elo_change)}
        </div>

        <div className="col-6 d-flex align-items-center justify-content-center">
          <strong>{Math.abs(Math.round(this.props.games.left.elo_change))}</strong>
        </div>

        <div className="col-3 pl-0 text-right">
          {this.getArrow(this.props.games.right.elo_change)}
        </div>
      </div>
    );

    } else {
      return (<div className="row my-2"></div>)
    }

  }
}
