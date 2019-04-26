import React, { useState } from 'react';
import { connect } from 'react-redux';

import { move } from 'redux/actions';
import CoreLayout from 'containers/CoreLayout';

import './Play.scss';

export const Play = ({ dispatch, game }) => {
  const { board, players } = game;

  const [row, setRow] = useState('');
  const [column, setColumn] = useState('');

  const submitMove = () => {
    if (row.trim() !== '' && !isNaN(row) && column.trim() !== '' && !isNaN(column)) {
      dispatch(move(Number(row), Number(column)));
    } else {
      alert('You need to pick a row and column before you can move!');
    }
  };

  // HACKY BOARD DRAWING
  const boardCellNumber = 3;
  const cellIndices = [...Array(boardCellNumber).keys()];

  const drawRow = (row) => {
    const center = cellIndices.map(ind => row[ind] || ' ')
      .join(' | ');
    return `| ${ center } |`;
  };

  const verticalBorder = cellIndices.reduce((string) => string.concat('----'), '-')
  const rowHTML = [verticalBorder, ...board.map(drawRow), verticalBorder]
    .map((row, ind) => <p key={ ind }>{ row }</p>);

  return (
    <CoreLayout className="game__container">
      <div>
        <h2>{ players[0] } vs. { players[1] }</h2>
        <p>{ `${ players[game.currentPlayerIndex] }'s turn` }</p>
        <div>
          { rowHTML }
        </div>

        <div>
          Select a row:
          <select
            value={ row }
            onChange={ ({ target }) => { setRow(target.value); } }
          >
            <option value="" disabled>Please make a row selection</option>
            {
              cellIndices.map(ind => (
                <option value={ ind } key={ ind } >{ ind }</option>
              ))
            }
          </select>
        </div>

        <div>
          Select a column:
          <select
            value={ column }
            onChange={ ({ target }) => { setColumn(target.value); } }
          >
            <option value="" disabled>Please make a column selection</option>
            {
              cellIndices.map(ind => (
                <option value={ ind } key={ ind } >{ ind }</option>
              ))
            }
          </select>
        </div>

        <input
          className="submit"
          type="submit"
          onClick={ () => { submitMove(); } }
        />
      </div>
    </CoreLayout>
  );
};

const mapStateToProps = state => ({
  game: state.game
});

export default connect(mapStateToProps)(Play);
