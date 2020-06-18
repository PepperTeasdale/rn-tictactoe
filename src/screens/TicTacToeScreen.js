import React, { useState, useReducer } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

import TicTacToeSquare from '../components/TicTacToeSquare'

const EMPTY_SQUARE = 0
const X_SQUARE = 1
const O_SQUARE = 2

const startingBoard = [
  [EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE],
  [EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE],
  [EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE],
]

const startingGame = {
  currentTurn: 0,
  board: startingBoard,
}

export const gameReducer = (gameState, action) => {
  switch (action.type) {
    case 'CHANGE_PLAYER':
      return {
        ...gameState,
        currentTurn: (gameState.currentTurn + 1) % 2,
      }
    default:
      return gameState
  }
}


const TicTacToeScreen = () => {
  const [gameState, dispatch] = useReducer(gameReducer, startingGame)

  return <View style={styles.board}>
    <Text>{`Player ${gameState.currentTurn + 1} Turn`}</Text>
    {
      gameState.board.map((row, rowNum) => {
        return <View style={styles.row} key={rowNum}>
          {
            row.map((square, colNum) => (
              <TicTacToeSquare
                cell={`${rowNum}-${colNum}`}
                key={`${rowNum}-${colNum}`}
                onPress={() => {
                  dispatch({ type: 'CHANGE_PLAYER' })
                }}
              />)
            )
          }
        </View>
      })
    }
  </View>
}

const styles = StyleSheet.create({
  board: {
    flexDirection: "column",
    height: vmin(100),
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
})

export default TicTacToeScreen
