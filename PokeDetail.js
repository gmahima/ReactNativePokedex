import React, { useEffect } from 'react';
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
 

    React.useLayoutEffect(() => {
        let color = 'white'
        if(data) {
            switch(data.types[0].type.name) {
                case 'grass': color = 'teal'; break;
                case 'fire': color = 'red'; break;
                case 'water': color = 'blue'; break;
                case 'bug': color = 'green'; break;
                case 'poison': color = 'purple'; break;
                case 'flying': color = 'cyan'; break;
                case 'electric': color = 'orange'; break;
                case 'fairy': color = 'pink'; break;
                case 'ground': color = 'brown'; break;
                case 'psychic' : color = 'lilac'; break; 
                case 'fighting' : color = 'papayawhip'; break;
                case 'rock' : color = 'gray'; break;
                case 'ghost': color = 'gray'; break;
                case 'dragon': color = 'red'; break;        
                default: color = 'white'; break;
            }
        }
        navigation.setOptions({
            headerStyle: {
                backgroundColor: color,
              }
        });
    }, [data]);

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


