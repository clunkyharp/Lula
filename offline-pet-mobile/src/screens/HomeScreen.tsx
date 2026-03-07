import React from 'react';
import { Button, Text, View } from 'react-native';
import { ScreenFrame } from '../components/ScreenFrame';
import { useAppSelector } from '../hooks/useAppSelector';

export function HomeScreen({ navigation }: any): React.JSX.Element {
  const pet = useAppSelector((s) => s.pet);

  return (
    <ScreenFrame title={`Hi, ${pet.name}`} subtitle={`Stage: ${pet.stage} | Emotion: ${pet.emotion}`}>
      <Text>Health {pet.health} | Happiness {pet.happiness} | Hunger {pet.hunger}</Text>
      <View style={{ marginTop: 12, gap: 10 }}>
        <Button title="Start Focus" onPress={() => navigation.navigate('Focus')} />
        <Button title="Pet Status" onPress={() => navigation.navigate('PetStatus')} />
        <Button title="Feed" onPress={() => navigation.navigate('FeedPet')} />
        <Button title="Play" onPress={() => navigation.navigate('PlayPet')} />
        <Button title="Heal" onPress={() => navigation.navigate('HealPet')} />
        <Button title="Daily Stats" onPress={() => navigation.navigate('DailyStats')} />
        <Button title="Streak" onPress={() => navigation.navigate('Streak')} />
        <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      </View>
    </ScreenFrame>
  );
}
