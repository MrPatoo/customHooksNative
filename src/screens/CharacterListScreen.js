import React from 'react';
import { View, Text, FlatList, Image, Button, ActivityIndicator } from 'react-native';
import { useCharacters } from '../hooks/useCharacters';

export default function CharacterListScreen({ navigation }) {
  const { characters, info, page, loading, error, loadCharacters } = useCharacters();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={{ color: 'red' }}>Error: {error.message}</Text>}
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'center' }}>
            <Image source={{ uri: item.image }} style={{ width: 50, height: 50, marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
              <Text>{item.species} — {item.status}</Text>
            </View>
            <Button title="Ver" onPress={() => navigation.navigate('CharacterDetail', { id: item.id })} />
          </View>
        )}
        onEndReached={() => {
          if (info?.next) loadCharacters(page + 1);
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
