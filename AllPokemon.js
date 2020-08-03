import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import useSWR from 'swr'
import PokeCard from './components/PokeCard'
import styled from 'styled-components/native'

const Container = styled.View `
margin: 30px;
display; flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
`
const SView = styled.View `
background: #edf2f7;
flex: 1;
`

const fetcher = (...args) => fetch(...args).then((res) => res.json())
const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
export default function AllPokemon({navigation}) {
  const { data, error } = useSWR(url, fetcher)

  if (error) return <View><Text>failed to load</Text></View>
  if (!data) return <View><Text>loading...</Text></View>
return <ScrollView><SView><Container>{data.results.map((p, i) => <TouchableOpacity onPress={() => (navigation.navigate('PokeDetail', {name: p.name, url:p.url}))} key={(i+1).toString()}><PokeCard  id={(i+1).toString()} name={p.name} url={p.url} navigation={navigation}/></TouchableOpacity>)}</Container></SView></ScrollView>
}
