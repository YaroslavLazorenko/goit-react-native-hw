import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';

export default function App() {
  const [screen, setScreen] = useState('Registration');

  return (
    <>
      {screen === 'Registration' && <RegistrationScreen showScreen={setScreen} />}
      {screen === 'Login' && <LoginScreen showScreen={setScreen} />}
    </>
  );
}
