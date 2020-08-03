import React from 'react';
import {Text, View,Image,TouchableOpacity } from 'react-native';
import sprites from '../assets/sprites/index.js'

export default function PokeCard({id, url, name}) {


return (

        <View>
            <Image
                source={sprites[id]}
            />
            <Text>{name}</Text>
        </View>

)
}


