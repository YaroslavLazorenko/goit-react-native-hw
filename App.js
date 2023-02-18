import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';

export default function App() {
  const [screen, setScreen] = useState('');

  return (
    <>
      {screen === 'Registration' && <RegistrationScreen />}
      {screen === 'Login' && <LoginScreen />}
      {screen === '' && (
        <View style={styles.container}>
          <Button
            onPress={() => {
              setScreen('Registration');
            }}
            title="Registration screen"
          />
          <Button
            onPress={() => {
              setScreen('Login');
            }}
            title="Login screen"
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
