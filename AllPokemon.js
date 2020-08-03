import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import useSWR from 'swr'
import PokeCard from './components/PokeCard'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const url = 'https://pokeapi.co/api/v2/pokemon?limit=10'
export default function AllPokemon({navigation}) {
  const { data, error } = useSWR(url, fetcher)

  if (error) return <View><Text>failed to load</Text></View>
  if (!data) return <View><Text>loading...</Text></View>
return <ScrollView>{data.results.map((p, i) => <TouchableOpacity onPress={() => (navigation.navigate('PokeDetail', {name: p.name, url:p.url}))} key={(i+1).toString()}><PokeCard  id={(i+1).toString()} name={p.name} url={p.url} navigation={navigation}/></TouchableOpacity>)}</ScrollView>
}
