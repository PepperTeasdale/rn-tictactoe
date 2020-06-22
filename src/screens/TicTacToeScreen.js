import React, { useState, useReducer } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

import TicTacToeSquare from '../components/TicTacToeSquare'

const EMPTY_SQUARE = "";
const X_SQUARE = "X";
const O_SQUARE = "O";

const startingBoard = [
  [EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE],
  [EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE],
  [EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE],
];

const startingGame = {
  currentTurn: 0,
  board: startingBoard,
};

const checkForVerticalWin = (board, mark) => {
  return [0, 1, 2].reduce((acc, num) => {
    return acc || (
      board[0][num] === mark &&
      board[1][num] === mark &&
      board[2][num] === mark
    )
  }, false)
}

const checkForWin = (board, mark) => {
  return checkForVerticalWin(board, mark)
}

export const gameReducer = (gameState, action) => {
  switch (action.type) {
    case 'MOVE_OCCURRED':
      const [rowToChange, colToChange] = action.payload.location;
      if (["X", "O"].includes(gameState.board[rowToChange][colToChange])) {
        return gameState
      }
      const currentMark = gameState.currentTurn === 0 ? "X" : "O"
      const newState = gameState.board.map((row, i) => {
        if (i === rowToChange) {
          return row.map((col, j) => {
            if (j === colToChange) {
              return currentMark
            }
            return col;
          })
        }
        return row;
      });

      if (checkForWin(newState, currentMark)) {
        return {
          winner: gameState.currentTurn,
          board: newState,
          currentTurn: (gameState.currentTurn + 1) % 2,
        };
      }

      return {
        board: newState,
        currentTurn: (gameState.currentTurn + 1) % 2,
      };
    default:
      return gameState
  }
};


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
    flexDirection: "column",
    height: vmin(100),
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
})

export default TicTacToeScreen
