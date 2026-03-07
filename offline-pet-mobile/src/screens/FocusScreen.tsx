import React, { useEffect, useMemo, useState } from 'react';
import { Button, Text, TextInput } from 'react-native';
import { ScreenFrame } from '../components/ScreenFrame';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { store } from '../store';
import { endSession, startSession } from '../store/slices/sessionSlice';
import { FocusEngine } from '../services/focusEngine';

export function FocusScreen({ navigation }: any): React.JSX.Element {
  const dispatch = useAppDispatch();
  const session = useAppSelector((s) => s.session);
  const [minutes, setMinutes] = useState('60');

  const engine = useMemo(() => new FocusEngine(dispatch, store.getState), [dispatch]);

  useEffect(() => {
    return () => engine.stop();
  }, [engine]);

  const start = () => {
    dispatch(startSession({ plannedMinutes: Number(minutes) || 60 }));
    engine.start();
  };

  return (
    <ScreenFrame title="Focus Session" subtitle="Clean minutes only">
      <TextInput
        value={minutes}
        onChangeText={setMinutes}
        keyboardType="numeric"
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 8 }}
      />
      <Text>
        Elapsed: {session.elapsedMinutes} | Clean: {session.cleanMinutes} | Violated: {session.violatedMinutes}
      </Text>
      <Text>
        Coins: {session.earnedCoins} | XP: {session.earnedXp}
      </Text>
      <Button title="Start" onPress={start} />
      <Button
        title="End Session"
        onPress={() => {
          engine.stop();
          dispatch(endSession());
          navigation.navigate('SessionResult');
        }}
      />
    </ScreenFrame>
  );
}
