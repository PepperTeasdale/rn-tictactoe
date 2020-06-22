import React from 'react'
import { Text } from 'react-native'
import renderer, { act } from 'react-test-renderer';

import TicTacToeScreen, { gameReducer } from './TicTacToeScreen'
import TicTacToeSquare from '../components/TicTacToeSquare'

describe('<TicTacToeScreen/>', () => {
  it('displays the current player turn', () => {
    const instance = renderer.create(<TicTacToeScreen />).root

    expect(instance.find(child => child.props.children === 'Player 1 Turn')).toBeDefined()
  })
  it('displays changes the current player turn when a square is clicked', () => {
    const instance = renderer.create(<TicTacToeScreen />).root

    act(() => {
      instance.findByProps({ cell: '0-0' }).props.onPress()
    })

    expect(instance.find(child => child.props.children === 'Player 2 Turn')).toBeDefined()
  })
  it('renders 9 TicTacToeSquares', () => {
    const instance = renderer.create(<TicTacToeScreen />).root
    expect(instance.findAllByType(TicTacToeSquare).length).toEqual(9)
  })
  
  it('displays the X move when a square is clicked', () => {
    const instance = renderer.create(<TicTacToeScreen />).root

    act(() => {
      instance.findByProps({ cell: '0-0' }).props.onPress()
    });

    expect(instance.findByProps({ cell: '0-0' }).findByType('Text').props.children).toEqual('X')
  });

  it('displays the O move when a square is clicked on player twos turn', () => {
    const instance = renderer.create(<TicTacToeScreen />).root;

    act(() => {
      instance.findByProps({ cell: '0-0' }).props.onPress();
      instance.findByProps({ cell: '0-1' }).props.onPress();
    });

    expect(instance.findByProps({ cell: '0-1' }).findByType('Text').props.children).toEqual('O')
  })
})

describe(gameReducer, () => {
  describe('MOVE_OCCURRED', () => {
    it("updates the board state for the location passed in the action", () => {
      const initialState = {
        currentTurn: 0,
        board: [
          ["","",""],
          ["","",""],
          ["","",""],
        ]
      };
      const expectedState = {
        currentTurn: 1,
        board: [
          ["X","",""],
          ["","",""],
          ["","",""],
        ]
      };
      const payload = { location: [0,0] };

      const newState = gameReducer(initialState, { type: "MOVE_OCCURRED", payload });

      expect(newState).toEqual(expectedState)
    })
    it("does not update the board state if the cell is already occupied", () => {
      const initialState = {
        currentTurn: 0,
        board: [
          ["","X",""],
          ["","",""],
          ["","",""],
        ]
      };
      const expectedState = {
        currentTurn: 0,
        board: [
          ["","X",""],
          ["","",""],
          ["","",""],
        ]
      };
      const payload = { location: [0,1] };

      const newState = gameReducer(initialState, { type: "MOVE_OCCURRED", payload });

      expect(newState).toEqual(expectedState)
    })

    it("detects when a player has 3 in a row vertically", () => {
      const initialState = {
        currentTurn: 1,
        board: [
          ["O","X",""],
          ["O","X","X"],
          ["","",""],
        ]
      };
      const expectedState = {
        winner: 1,
        currentTurn: 0,
        board: [
          ["O","X",""],
          ["O","X","X"],
          ["O","",""],
        ]
      };
      const payload = { location: [2,0] };

      const newState = gameReducer(initialState, { type: "MOVE_OCCURRED", payload });

      expect(newState).toEqual(expectedState)
    })

    it("detects when a player has 3 in a row vertically", () => {
      const initialState = {
        currentTurn: 0,
        board: [
          ["O","X",""],
          ["O","X",""],
          ["","",""],
        ]
      };
      const expectedState = {
        winner: 0,
        currentTurn: 1,
        board: [
          ["O","X",""],
          ["O","X",""],
          ["","X",""],
        ]
      };
      const payload = { location: [2,1] };

      const newState = gameReducer(initialState, { type: "MOVE_OCCURRED", payload });

      expect(newState).toEqual(expectedState)
    })
  })
});
