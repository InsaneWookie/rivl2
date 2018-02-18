import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class SubmitButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };

    this.submit = this.submit.bind(this);
  }

  submit(){
    this.setState({isLoading: true});

    this.props.onClick().finally(() => {
      this.setState({isLoading: false});
    });
  }

  render() {
    return (
      <button className="btn btn-success btn-block btn-inline-sm"
              disabled={this.props.disabled || this.state.isLoading}
              onClick={this.submit}>{this.props.children}</button>
    );
  }
}
