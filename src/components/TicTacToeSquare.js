import React, { useState, useReducer } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const TicTacToeSquare = ({ cell, onPress}) => {

  return <TouchableOpacity style={styles.square} onPress={onPress}>
    <View key={cell}>
      <Text style={styles.mark}>X</Text>
    </View>
  </TouchableOpacity>
}


const styles = StyleSheet.create({
  square: {
    flex: 1,
    backgroundColor: "blue",
    borderWidth: 1,
    borderColor: "white",
  },
  mark: {
    textAlign: 'center',
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
  },
})

export default TicTacToeSquare
