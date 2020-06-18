import React from 'react'
import { FlatList, Text, StyleSheet } from 'react-native'

const renderFriends = ({ item }) => {
  return <Text style={styles.textElement}>{item.name} - Age {item.age}</Text>
}

const ListScreen = () => {
  const friends = [
    { name: 'Joey', key: 'A', age: '30' },
    { name: 'Chandler', key: 'B', age: '50' },
    { name: 'Rachel', key: 'C', age: '39' },
    { name: 'Monica', key: 'D', age: '40' },
    { name: 'Ross', key: 'E', age: '25' },
    { name: 'Phoebe', key: 'F', age: '35' },
  ]
  return <>
    <FlatList data={friends} renderItem={renderFriends}></FlatList>
    </>
}


const styles = StyleSheet.create({
  textElement: {
    marginVertical: 30,
  },
})

export default ListScreen
