import React from 'react';
import { spy } from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { init as gameInit } from 'redux/reducers/game';

import { Play } from 'routes/Play';

Enzyme.configure({ adapter: new Adapter() })

// Stub out window alert function, which is called on frontend
window.alert = () => {};

// create any initial state needed
const mockWinnerState = {
  players: ['Player 1', 'Player 2'],
  board: [
    ['X', 'O', 'O'],
    [null, 'X', null],
    [null, null, 'X']
  ],
  currentPlayerIndex: 1
};

describe('Play', () => {


  describe('Move submission', () => {
    it('dispatches when 0 is selected for row and column', () => {
      const dispatch = spy();
      const component = shallow(<Play dispatch={ dispatch } game={ gameInit() } />);

      const selects = component.find('select');

      selects.first().simulate('change', { target: { value: '0' } });
      selects.last().simulate('change', { target: { value: '0' } });

      const input = component.find('input')
      input.simulate('click')
      expect(dispatch.lastCall.args[0]).toEqual({
        type: 'MOVE',
        row: 0,
        column: 0
      });
    });

    it('dispatches the appropriate action to the store', () => {
      const dispatch = spy();
      const component = shallow(<Play dispatch={ dispatch } game={ gameInit() } />);

      const selects = component.find('select');

      selects.first().simulate('change', { target: { value: '1' } });
      selects.last().simulate('change', { target: { value: '2' } });

      const input = component.find('input')
      input.simulate('click')
      expect(dispatch.lastCall.args[0]).toEqual({
        type: 'MOVE',
        row: 1,
        column: 2
      });
    });

    it('does not dispatch if no row or column has been chosen', () => {
      const dispatch = spy();
      const component = shallow(<Play dispatch={ dispatch } game={ gameInit() } />);

      const input = component.find('input')
      input.simulate('click')

      expect(dispatch.lastCall).toEqual(null);
    });



    it('determines winner and disables submit button', () => {


      const dispatch = spy();
      const component = shallow(<Play dispatch={ dispatch } game={ mockWinnerState } />);

      const winnerText = component.find('#winner-text');
      expect(winnerText.text()).toEqual('Player 1 is the winner!!!');

      const input = component.find('input');

      expect(input.props()["disabled"]).toBeTruthy();
    });
  });
})
