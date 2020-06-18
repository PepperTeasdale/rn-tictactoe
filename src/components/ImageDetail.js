import React from 'react'
import { Image, Text, StyleSheet, View } from 'react-native'

const ImageDetail = ({ src, title, score }) => {
  return <View>
    <Image source={src} />
    <Text>{title}</Text>
    <Text>Image Score - {score}</Text>
  </View>
}

const styles = StyleSheet.create({})

export default ImageDetail
