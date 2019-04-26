import React, { useState } from 'react';
import { connect } from 'react-redux';

import { move } from 'redux/actions';
import CoreLayout from 'containers/CoreLayout';

import './Play.scss';

export const Play = ({ dispatch, game }) => {
  const { board, players } = game;

  const [row, setRow] = useState('');
  const [column, setColumn] = useState('');

  const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const positionMap =  {
    0: [0, 0],
    1: [0, 1],
    2: [0, 2],
    3: [1, 0],
    4: [1, 1],
    5: [1, 2],
    6: [2, 0],
    7: [2, 1],
    8: [2, 2],
  };

  const checkForWinner = (board) => {

    for (let i = 0; i < winnerCombinations.length; i++) {
      let [point1, point2, point3] = winnerCombinations[i];

      point1 = positionMap[point1];
      point2 = positionMap[point2];
      point3 = positionMap[point3];

      if (board[point1[0]][point1[1]] && board[point1[0]][point1[1]] === board[point2[0]][point2[1]] && board[point1[0]][point1[1]] === board[point3[0]][point3[1]]) {
        return true;
      }
    }
    return false;
  };

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
    const cells = cellIndices.map(ind => <td key={ ind }>{ row[ind] }</td> || <td></td>);
    return cells;
  };

  const verticalBorder = cellIndices.reduce((string) => string.concat('----'), '-')
  const rowHTML = board.map(drawRow)
    .map((row, ind) => <tr key={ ind }>{ row }</tr>);

  console.log(rowHTML);

  const hasWinner = checkForWinner(board);

  return (

    <CoreLayout className="game__container">
      <div className="pt4">
        <h2>{ players[0] } vs. { players[1] }</h2>

        {
          hasWinner
              ? (
                  <p id="winner-text" className="mt4">{ `${ players[(game.currentPlayerIndex + 1) % 2] } is the winner!!!` }</p>
              )
              : (
                  <p className="mt4">{ `${ players[game.currentPlayerIndex] }'s turn` }</p>
              )
        }


        <table className="mt4">
          <tbody>
            { rowHTML }
          </tbody>
        </table>

        <div className="mt4">
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

        <div className="mt1">
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
          className="btn submit m3"
          type="submit"
          disabled={hasWinner}
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
