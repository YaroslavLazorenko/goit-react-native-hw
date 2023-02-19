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

import AddPhotoSVG from './components/AddPhotoSVG';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  showPassword: false,
  isKeyboardHide: true,
};

export default function RegistrationScreen({ showScreen }) {
  const [name, setName] = useState(INITIAL_STATE.name);
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [password, setPassword] = useState(INITIAL_STATE.password);
  const [showPassword, setShowPassword] = useState(INITIAL_STATE.showPassword);
  const [isKeyboardHide, setIsKeyboardHide] = useState(INITIAL_STATE.isKeyboardHide);

  const hideKeyboard = () => {
    setIsKeyboardHide(true);
    Keyboard.dismiss();
  };

  const nameHandler = text => {
    setName(text);
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
    setName(INITIAL_STATE.name);
    setEmail(INITIAL_STATE.email);
    setPassword(INITIAL_STATE.password);
  };

  const onSignup = () => {
    console.log('name: ', name);
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
              <View style={styles.photoContainer}>
                {/* <Image
                  style={styles.userPhoto}
                  source={require('../assets/images/user-photo.jpg')}
                /> */}
                <AddPhotoSVG />
              </View>
              <Text>Реєстрація</Text>
              <TextInput
                placeholder={"Ім'я"}
                textAlign={'left'}
                style={styles.input}
                value={name}
                onChangeText={nameHandler}
                onFocus={() => setIsKeyboardHide(false)}
              />
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
                    <Text style={styles.buttonTitle}>Зареєструватись</Text>
                  </TouchableOpacity>
                  <Text
                    onPress={() => {
                      showScreen('Login');
                    }}
                  >
                    Вже є акаунт? Увійти
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
    justifyContent: 'flex-end',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 200,
  },

  photoContainer: {
    flex: 1,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#f6f6f6',
  },
  // userPhoto: {},
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
