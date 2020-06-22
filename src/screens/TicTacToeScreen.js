import React, { useReducer } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { vmin } from 'react-native-expo-viewport-units'

import TicTacToeSquare from '../components/TicTacToeSquare'
import * as R from 'ramda'

export const EMPTY_SQUARE = ''
export const X_SQUARE = 'X'
export const O_SQUARE = 'O'

const startingBoard = [
  [EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE],
  [EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE],
  [EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE],
]

const startingGame = {
  currentTurn: 0,
  board: startingBoard,
}

const checkForVerticalWin = (board, winChecker) => {
  return [0, 1, 2].reduce((acc, num) => {
    return acc || R.all(winChecker, [board[0][num], board[1][num], board[2][num]])
  }, false)
}

const checkForHorizontalWin = (board, winChecker) => {
  return [0, 1, 2].reduce((acc, num) => {
    return acc || R.all(winChecker, [board[num][0], board[num][1], board[num][2]])
  }, false)
}

const checkForDiagonalWin = (board, winChecker) => {
  return R.all(winChecker, [board[0][0], board[1][1], board[2][2]])
}

const checkForWin = (board, winChecker) => {
  return checkForVerticalWin(board, winChecker) ||
    checkForHorizontalWin(board, winChecker) ||
    checkForDiagonalWin(board, winChecker)
}

export const gameReducer = (gameState, action) => {
  switch (action.type) {
    case 'MOVE_OCCURRED':
      const [rowToChange, colToChange] = action.payload.location

      if (EMPTY_SQUARE !== gameState.board[rowToChange][colToChange]) {
        return gameState
      }
      const currentMark = gameState.currentTurn === 0 ? X_SQUARE : O_SQUARE
      const newState = gameState.board.map((row, i) => {
        if (i === rowToChange) {
          return row.map((col, j) => {
            if (j === colToChange) {
              return currentMark
            }
            return col
          })
        }
        return row
      })

      if (checkForWin(newState, R.equals(currentMark))) {
        return {
          winner: gameState.currentTurn,
          board: newState,
          currentTurn: (gameState.currentTurn + 1) % 2,
        }
      }

      return {
        board: newState,
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
                val={gameState.board[rowNum][colNum]}
                key={`${rowNum}-${colNum}`}
                onPress={() => {
                  dispatch({ type: 'MOVE_OCCURRED', payload: { location: [rowNum, colNum] } })
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
    flexDirection: 'column',
    height: vmin(100),
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
})

export default TicTacToeScreen
