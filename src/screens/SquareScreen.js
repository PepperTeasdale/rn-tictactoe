import React, { useState, useReducer } from 'react'
import { View, StyleSheet } from 'react-native'

import ColorButton from '../components/ColorButton'

const reducer = (state, action) => {
  if (!['red', 'green', 'blue'].includes(action.color)) {
    return state
  } else if (state.color + action.amount >= 255 || state.color + action.amount <= 0) {
    return state
  }

  return {
    ...state,
    [action.color]: state[action.color] + action.amount
  }
}

const SquareScreen = () => {
  const [state, dispatch] = useReducer(reducer, {
    red: 0,
    green: 0,
    blue: 0,
  })

  return <View>
    <ColorButton title="More Red" onPress={() => {
      dispatch({
        color: "red",
        amount: 15,
      })
    }}/>
    <ColorButton title="Less Red" onPress={() => {
      dispatch({
        color: "red",
        amount: -15,
      })
    }}/>
    <ColorButton title="More Green" onPress={() => {
      dispatch({
        color: "green",
        amount: 15,
      })
    }}/>
    <ColorButton title="Less Green" onPress={() => {
      dispatch({
        color: "green",
        amount: -15,
      })
    }}/>
    <ColorButton title="More Blue" onPress={() => {
      dispatch({
        color: "blue",
        amount: 15,
      })
    }}/>
    <ColorButton title="Less Blue" onPress={() => {
      dispatch({
        color: "blue",
        amount: -15,
      })
    }}/>
    <View style={styles.colorStyle(state)}/>
  </View>
}

const styles = StyleSheet.create({
  colorStyle: ({ red, blue, green }) => ({
    height: 50,
    width: 100,
    backgroundColor: `rgb(${red},${green},${blue})`,
  })
})

export default SquareScreen
