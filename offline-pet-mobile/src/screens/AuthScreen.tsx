import React from 'react';
import { Button, View } from 'react-native';
import { ScreenFrame } from '../components/ScreenFrame';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setSession } from '../store/slices/authSlice';

export function AuthScreen({ navigation }: any): React.JSX.Element {
  const dispatch = useAppDispatch();

  const login = (provider: 'apple' | 'google') => {
    dispatch(setSession({ userId: 'demo-user', provider, accessToken: 'demo-token' }));
    navigation.replace('CreatePet');
  };

  return (
    <ScreenFrame title="Sign In" subtitle="Use Apple or Google to continue">
      <View style={{ gap: 12 }}>
        <Button title="Continue with Apple" onPress={() => login('apple')} />
        <Button title="Continue with Google" onPress={() => login('google')} />
      </View>
    </ScreenFrame>
  );
}
