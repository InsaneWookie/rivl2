import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class Competitions extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">Example Component</div>

                            <div className="panel-body">
                                <ul>
                                    {this.props.competitions.map((item, index) => (
                                        <li key={index}><a href={`#competition/${item.id}`}>{item.name}</a></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
