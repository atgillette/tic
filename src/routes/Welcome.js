import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CoreLayout from 'containers/CoreLayout';
import { addPlayer } from 'redux/actions';

const Welcome = ({ dispatch, players }) => {
  const [value, setValue] = useState('');

  const playerHeader = [players[0], players[1]].filter(p => p).join(' vs. ');

  const handleSubmit = () => {
    if (value.length > 0) {
      dispatch(addPlayer(value));
      setValue('');
    }
  };

  return (
    <CoreLayout>
      <div className="col--center typ--center" style={ { maxWidth: '42rem' } }>
        <h3 className="typ--bold mb6">Let's play Tic Tac Toe</h3>
        {
          playerHeader.length > 0
            ? (
              <h3 className="mb4">
                { playerHeader }
              </h3>
            )
            : null
        }

        { players.length < 2
          ? (
            <div>
              <p className="typ--b1 mb2">
                {
                  players.length === 1
                    ? `Next, enter a name for player number ${players.length + 1}:`
                    : `Enter a name for player number ${players.length + 1}:`
                }
              </p>
              <div style={ { display: 'flex' } }>
                <input
                  className="form__input mr1"
                  type="text"
                  value={value}
                  onKeyPress={({ key }) => {
                    if (key === 'Enter') { handleSubmit(); }
                  }}
                  onChange={({ target }) => { setValue(target.value) }}
                />
                <input
                  className="btn"
                  type="submit"
                  value="Submit"
                  onClick={ handleSubmit }
                />
              </div>
            </div>
          )
          : (
            <Link className="btn" to="/play">
              Start the game
            </Link>
          )
        }
      </div>
    </CoreLayout>
  );
}

const mapStateToProps = state => ({
  players: state.game.players
});

export default connect(mapStateToProps)(Welcome);
