import React from 'react';
import { Button, Text } from 'react-native';
import { ScreenFrame } from '../components/ScreenFrame';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { resetSession } from '../store/slices/sessionSlice';

export function SessionResultScreen({ navigation }: any): React.JSX.Element {
  const session = useAppSelector((s) => s.session);
  const dispatch = useAppDispatch();

  return (
    <ScreenFrame title="Session Result" subtitle="Penalty mode active">
      <Text>Clean minutes: {session.cleanMinutes}</Text>
      <Text>Violated minutes: {session.violatedMinutes}</Text>
      <Text>Violations: {session.violations}</Text>
      <Text>Earned: {session.earnedCoins} coins / {session.earnedXp} XP</Text>
      <Button
        title="Back Home"
        onPress={() => {
          dispatch(resetSession());
          navigation.navigate('Home');
        }}
      />
    </ScreenFrame>
  );
}
