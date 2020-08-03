import React from 'react';
import AllPokemon from './AllPokemon'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokeDetail from './PokeDetail'
export default function App() {
const PokeStack = createStackNavigator()
return (
  <NavigationContainer>
    <PokeStack.Navigator>
      <PokeStack.Screen component={AllPokemon} name={"AllPokemon"} options={{title: "Poké Gallery"}}/>
      <PokeStack.Screen component={PokeDetail} name={"PokeDetail"} options={({ route }) => ({ title: route.params.name })} />
    </PokeStack.Navigator>
  </NavigationContainer>
)
}


