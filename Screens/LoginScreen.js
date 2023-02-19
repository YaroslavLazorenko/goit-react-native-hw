import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const INITIAL_STATE = {
  email: '',
  password: '',
  showPassword: false,
  isKeyboardHide: true,
};

export default function LoginScreen({ showScreen }) {
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [password, setPassword] = useState(INITIAL_STATE.password);
  const [showPassword, setShowPassword] = useState(INITIAL_STATE.showPassword);
  const [isKeyboardHide, setIsKeyboardHide] = useState(INITIAL_STATE.isKeyboardHide);

  const hideKeyboard = () => {
    setIsKeyboardHide(true);
    Keyboard.dismiss();
  };

  const emailHandler = text => {
    setEmail(text);
  };

  const passwordHandler = text => {
    setPassword(text);
  };

  const showPasswordHandler = () => {
    const toggle = showPassword ? false : true;
    setShowPassword(toggle);
  };

  const resetForm = () => {
    setEmail(INITIAL_STATE.email);
    setPassword(INITIAL_STATE.password);
  };

  const onSignup = () => {
    console.log('email: ', email);
    console.log('password: ', password);
    hideKeyboard();
    resetForm();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/images/background-image.jpg')}
        >
          <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={styles.formContainer}>
              <Text>Увійти</Text>
              <TextInput
                placeholder={'Адреса електронної пошти'}
                textAlign={'left'}
                style={styles.input}
                value={email}
                onChangeText={emailHandler}
                onFocus={() => setIsKeyboardHide(false)}
              />
              <View>
                <TextInput
                  placeholder={'Пароль'}
                  textAlign={'left'}
                  secureTextEntry={!showPassword}
                  style={styles.input}
                  value={password}
                  onChangeText={passwordHandler}
                  onFocus={() => setIsKeyboardHide(false)}
                />
                <Text onPress={showPasswordHandler}>{showPassword ? 'Сховати' : 'Показати'}</Text>
              </View>
              {isKeyboardHide ? (
                <>
                  <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onSignup}>
                    <Text style={styles.buttonTitle}>Увійти</Text>
                  </TouchableOpacity>
                  <Text
                    onPress={() => {
                      showScreen('Registration');
                    }}
                  >
                    Нема акаунту? Зареєструватись
                  </Text>
                </>
              ) : null}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    marginTop: 100,
    width: 100,
  },
  input: {
    backgroundColor: '#e8e8e8',
  },
  button: {
    height: 51,
    backgroundColor: '#ff6c00',
  },
  buttonTitle: {
    color: '#fff',
  },
});
