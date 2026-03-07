import React, { useState } from 'react';
import { Button, TextInput } from 'react-native';
import { ScreenFrame } from '../components/ScreenFrame';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setPet } from '../store/slices/petSlice';

export function CreatePetScreen({ navigation }: any): React.JSX.Element {
  const [name, setName] = useState('Nibble');
  const dispatch = useAppDispatch();

  return (
    <ScreenFrame title="Create Pet" subtitle="Name your companion">
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Pet name"
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 16 }}
      />
      <Button
        title="Create"
        onPress={() => {
          dispatch(
            setPet({
              name,
              stage: 'egg',
              emotion: 'neutral',
              health: 100,
              happiness: 60,
              energy: 60,
              hunger: 30,
              xp: 0,
              level: 1,
              alive: true
            })
          );
          navigation.replace('Home');
        }}
      />
    </ScreenFrame>
  );
}
