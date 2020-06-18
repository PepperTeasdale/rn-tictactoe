import React from 'react'
import { Text } from 'react-native'
import renderer, { act } from 'react-test-renderer';

import TicTacToeScreen from './TicTacToeScreen'
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
    })

    expect(instance.findByProps({ cell: '0-0' }).findByType('Text').props.children).toEqual('X')
  })
})
