import React from 'react'
import { Button, View } from 'react-native'

const ColorButton = ({ title, onPress }) => {
  return <Button title={title} onPress={onPress} />
}

export default ColorButton
