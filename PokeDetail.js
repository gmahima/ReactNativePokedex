import React from 'react';
import {Text, View, ScrollView, Image } from 'react-native';
import useSWR from 'swr'
import sprites from './assets/sprites/index.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const fetcher = (...args) => fetch(...args).then((res) => res.json())
const DetailTabs = createBottomTabNavigator()


const PokeDetailCard = ({data, error}) => {
     if (error) return <View><Text>failed to load</Text></View>
    if (!data) return <View><Text>loading...</Text></View>
    const id = data.id
    return( 
        <ScrollView>
            <Text>{data.name}</Text>
            <Image
                source={sprites[id]}
            />
        </ScrollView>
    )
}
const Attacks = ({data, error}) => {
     if (error) return <View><Text>failed to load</Text></View>
    if (!data) return <View><Text>loading...</Text></View>
    const id = data.id
    return( 
        <ScrollView>
            <Text>{data.name}</Text>
            <Image
                source={sprites[id]}
            />
            <View>{data.moves.map(m => <Text key={m.move.name}>{m.move.name}</Text>)}</View>
        </ScrollView>
    )
}

export default function PokeDetail({route, navigation}) {
    const url = route.params.url
    const { data, error } = useSWR(url, fetcher)

    return( 
        <DetailTabs.Navigator >
            <DetailTabs.Screen name="Details">
                {() => <PokeDetailCard data={data} error={error} />}
            </DetailTabs.Screen>
            <DetailTabs.Screen name="Attacks">
               {() =>  <Attacks data={data} error={error} />}
            </DetailTabs.Screen>
        </DetailTabs.Navigator>

    )
}


