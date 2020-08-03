import React from 'react';
import {Text, View,Image,TouchableOpacity } from 'react-native';
import sprites from '../assets/sprites/index.js'
import styled from 'styled-components/native'


const Card = styled.View `

    shadowOffset: { width: 0, height: 1 };
    shadowOpacity: 0.8;
    shadowRadius: 4px;  
    elevation: 1;

background-color: white;
padding: 2px 15px;

display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
border-radius: 10px;
margin: 5px;
`
const SImage = styled.Image `

`
const SText = styled.Text `
font-size: 12px;
font-weight: bold;

align-self: stretch;
text-align: center;

`
export default function PokeCard({id, url, name}) {
return (

        <Card>
            <SImage
                source={sprites[id]}
            />
            <SText>{name}</SText>
        </Card>

)
}


