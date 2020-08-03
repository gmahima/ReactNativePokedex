import React, { useEffect } from 'react';
import {Text, View, ScrollView, Image } from 'react-native';
import useSWR from 'swr'
import sprites from './assets/sprites/index.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native'

const SView = styled.View `
background: #edf2f7;
display: flex;
justify-content: center;
align-items: center;
flex: 1;
`
const Card = styled.View `
background: white;
border-radius: 10px;
width: 300px;
padding: 10px 0px;
display: flex;

`
const SImage = styled.Image `

width: 150px;
height: 150px;
align-self: center;
`
const Heading = styled.View `
margin: 10px 10px;
display: flex;
flex-direction: row;
justify-content: center;
align-self: stretch;
`
const Name = styled.Text`
font-weight: bold;
margin: 0 8px;
`
const Info = styled.View`
margin: 0px 10px;
align-self: stretch;
display: flex;
flex-direction: column;
align-items: stretch;


`
const KeyValue = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
background: #edf2f7;
padding: 1px 8px;
margin: 2px 0;
`
const Title = styled.Text `
font-size: 18px;
text-align: center;
font-weight: bold;
padding: 0 0 15px 0 ;
`
const SCard = styled(Card) `
margin: 45px 0;
padding: 20px 10px;
background: white;
`
const AttackView = styled(View)`
background: white;
display: flex;
flex-direction: row;
flex-wrap: wrap;
border-radius: 20px;
padding: 20px 0;
`
const AttackText = styled.Text`
font-size: 16px;
padding: 4px 8px;
`
const fetcher = (...args) => fetch(...args).then((res) => res.json())
const DetailTabs = createBottomTabNavigator()


const PokeDetailCard = ({data, error}) => {
     if (error) return <View><Text>failed to load</Text></View>
    if (!data) return <View><Text>loading...</Text></View>
    const id = data.id
    return( 
        <SView>
            <Card>
                <SImage
                    source={sprites[id]}
                />
                <Heading>
                    <Name>#{data.id}</Name>
                    <Name>{data.name}</Name>
                </Heading>
                <Info>
                    <KeyValue>
                        <Text>types</Text>
                        <Text>{data.types.map(a => a.type.name+ " ")}</Text>
                    </KeyValue>
                    <KeyValue>
                        <Text>abilities</Text>
                        <Text>{data.abilities.map(a => a.ability.name+ " ")}</Text>
                    </KeyValue>
                    <KeyValue>
                        <Text>height</Text>
                        <Text>{data.height}</Text>
                    </KeyValue>
                    <KeyValue>
                        <Text>weight</Text>
                        <Text>{data.weight}</Text>
                    </KeyValue>
                </Info>

            </Card>
            
        </SView>
    )
}

const Attacks = ({data, error}) => {
     if (error) return <View><Text>failed to load</Text></View>
    if (!data) return <View><Text>loading...</Text></View>
    const id = data.id
    return(
        
            <SView>
                <SCard>
                <Title>ATTACKS</Title>
                <ScrollView>
                <AttackView>{data.moves.map(m => <AttackText key={m.move.name}>{m.move.name}</AttackText>)}</AttackView>
                </ScrollView> 
                </SCard>
                
            </SView>
        
        
    )
}

export default function PokeDetail({route, navigation}) {
    const url = route.params.url
    const { data, error } = useSWR(url, fetcher)
 

    React.useLayoutEffect(() => {
        let color = 'white'
        if(data) {
            switch(data.types[0].type.name) {
                case 'grass': color = '#319795'; break;
                case 'fire': color = '#f56565'; break;
                case 'water': color = '#3182ce'; break;
                case 'bug': color = '#38a169'; break;
                case 'poison': color = '#805ad5'; break;
                case 'flying': color = '#a3bffa'; break;
                case 'electric': color = '#d69e2e'; break;
                case 'fairy': color = '#d53f8c'; break;
                case 'ground': color = '#975a16'; break;
                case 'psychic' : color = '#9f7aea'; break; 
                case 'fighting' : color = '#ecc94b'; break;
                case 'rock' : color = '#a0aec0'; break;
                case 'ghost': color = '#a0aec0'; break;
                case 'dragon': color = '#f56565'; break;        
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
        <DetailTabs.Navigator tabBarOptions={{
            activeBackgroundColor: 'black',
            inactiveBackgroundColor: 'gray',
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            labelPosition: 'beside-icon'
          }}>
            <DetailTabs.Screen name="Details">
                {() => <PokeDetailCard data={data} error={error} />}
            </DetailTabs.Screen>
            <DetailTabs.Screen name="Attacks">
               {() =>  <Attacks data={data} error={error} />}
            </DetailTabs.Screen>
        </DetailTabs.Navigator>

    )
}


