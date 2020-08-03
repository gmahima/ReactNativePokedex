import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const url = 'https://pokeapi.co/api/v2/pokemon/'
export default function App() {
  const { data, error } = useSWR(url, fetcher)

  if (error) return <View><Text>failed to load</Text></View>
  if (!data) return <View><Text>loading...</Text></View>
  console.log(data)
return <View><Text>{data.results[0].name}</Text></View>
  // return (
  //   <View style={styles.container}>
  //     <Text>Open up App.js to start working on your app!</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
