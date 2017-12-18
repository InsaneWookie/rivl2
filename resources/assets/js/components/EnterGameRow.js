import React, { Component } from 'react';

const EnterGameRow = props => {
  return (
    <div className="row my-2">
      <div className="col-3 pr-0">
        <label
          htmlFor={`game_${props.game}_winner_1`}
          className={`btn btn-block mb-0 ${
            props.winner === 1 ? 'btn-primary' : 'btn-light'
          }`}
        >
          Win
          <input
            type="radio"
            name={`game_${props.game}`}
            id={`game_${props.game}_winner_1`}
            onChange={() => props.setGameWinner(props.game, 1)}
          />
        </label>
      </div>
      <div className="col-6 d-flex align-items-center justify-content-center">
        <strong>Game {props.game}</strong>
      </div>
      <div className="col-3 pl-0 text-right">
        <label
          htmlFor={`game_${props.game}_winner_2`}
          className={`btn btn-block mb-0 ${
            props.winner === 2 ? 'btn-primary' : 'btn-light'
          }`}
        >
          Win
          <input
            type="radio"
            name={`game_${props.game}`}
            id={`game_${props.game}_winner_2`}
            onChange={() => props.setGameWinner(props.game, 2)}
          />
        </label>
      </div>
    </div>
  );
};

export default EnterGameRow;
