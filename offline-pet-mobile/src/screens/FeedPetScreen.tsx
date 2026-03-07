import React from 'react';
import { Button } from 'react-native';
import { ScreenFrame } from '../components/ScreenFrame';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { feedPet } from '../store/slices/petSlice';

export function FeedPetScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <ScreenFrame title="Feed Pet" subtitle="Apple +10 health">
      <Button title="Use Food" onPress={() => dispatch(feedPet())} />
    </ScreenFrame>
  );
}
