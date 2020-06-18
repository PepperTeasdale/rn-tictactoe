import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const TextScreen = () => {
  const [password, setPassword] = useState('')
  return (
    <View>
      <TextInput
        secureTextEntry
        autoCompleteType="password"
        autoCapitalize="none"
        value={password}
        style={styles.textInput}
        onChangeText={text => setPassword(text)}
      />
      {
        password.length >= 5 ?
          null :
          <Text>Your password must be greater than 5 characters</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1,
  },
})

export default TextScreen
