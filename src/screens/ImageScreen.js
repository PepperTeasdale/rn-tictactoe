import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import ImageDetail from '../components/ImageDetail'
const beach = require('../../assets/beach.jpg')
const forest = require('../../assets/forest.jpg')
const mountain = require('../../assets/mountain.jpg')

const ImageScreen = () => {
  const images = [{
    title: "Forest",
    src: forest,
    score: 7,
  }, {
    title: "Mountain",
    src: mountain,
    score: 7,
  }, {
    title: "Sea",
    src: beach,
    score: 9,
  }]
  return <View>
    {
      images.map(image => <ImageDetail { ...image } key={image.title} />)
    }
    </View>
}

const styles = StyleSheet.create({})

export default ImageScreen
