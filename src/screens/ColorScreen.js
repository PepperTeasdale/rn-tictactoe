import React, { useState} from 'react'
import { Button, FlatList, Text, View, StyleSheet } from 'react-native'

const randomColor = () => {
  const max = 256
  const rgb = []
  for (let i = 0; i < 3; i++) {
    rgb.push(Math.floor(Math.random() * max))
  }
  return rgb
}

const ColorScreen = () => {
  const [colors, setColors] = useState([])
  return <View>
    <Button title="Add Color" onPress={() => {
      const [r, g, b] = randomColor()
      setColors([
        ...colors,
        `rgb(${r},${g},${b})`
      ])
    }}/>
  <FlatList keyExtractor={item => item} data={colors} renderItem={({ item }) => <View style={styles.colorStyle(item)} />} />
  </View>
}

const styles = StyleSheet.create({
  colorStyle: (color) => ({
    height: 50,
    width: 100,
    backgroundColor: color,
  })
})

export default ColorScreen
