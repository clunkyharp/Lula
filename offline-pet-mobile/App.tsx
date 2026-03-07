import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './src/store';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { AuthScreen } from './src/screens/AuthScreen';
import { CreatePetScreen } from './src/screens/CreatePetScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { FocusScreen } from './src/screens/FocusScreen';
import { SessionResultScreen } from './src/screens/SessionResultScreen';
import { PetStatusScreen } from './src/screens/PetStatusScreen';
import { FeedPetScreen } from './src/screens/FeedPetScreen';
import { PlayPetScreen } from './src/screens/PlayPetScreen';
import { HealPetScreen } from './src/screens/HealPetScreen';
import { DailyStatsScreen } from './src/screens/DailyStatsScreen';
import { StreakScreen } from './src/screens/StreakScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="CreatePet" component={CreatePetScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Focus" component={FocusScreen} />
          <Stack.Screen name="SessionResult" component={SessionResultScreen} />
          <Stack.Screen name="PetStatus" component={PetStatusScreen} />
          <Stack.Screen name="FeedPet" component={FeedPetScreen} />
          <Stack.Screen name="PlayPet" component={PlayPetScreen} />
          <Stack.Screen name="HealPet" component={HealPetScreen} />
          <Stack.Screen name="DailyStats" component={DailyStatsScreen} />
          <Stack.Screen name="Streak" component={StreakScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
