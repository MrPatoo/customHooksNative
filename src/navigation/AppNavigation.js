import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//pantallas
import CharacterListScreen from '../screens/CharacterListScreen';
import CharacterDetailScreen from '../screens/CharacterDetailsScreen';
import EditCharacterScreen from '../screens/CharacterEditScreen'

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Characters" component={CharacterListScreen} options={{ title: 'Personajes de Rick y Morty' }} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} options={{ title: 'Detalle' }} />
        <Stack.Screen name="EditCharacter" component={EditCharacterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
