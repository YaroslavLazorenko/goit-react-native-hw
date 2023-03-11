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
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { authSignInUser } from '../../redux/auth/authOperations';

const INITIAL_STATE = {
  email: '',
  password: '',
  showPassword: false,
  isKeyboardHide: true,
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [password, setPassword] = useState(INITIAL_STATE.password);
  const [showPassword, setShowPassword] = useState(INITIAL_STATE.showPassword);
  const [isKeyboardHide, setIsKeyboardHide] = useState(
    INITIAL_STATE.isKeyboardHide,
  );
  const [focusedInput, setFocusedInput] = useState(null);

  const dispatch = useDispatch();

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
    setShowPassword(INITIAL_STATE.showPassword);
  };

  const onLogin = () => {
    console.log('Login credentials:');
    console.log('email: ', email);
    console.log('password: ', password);
    hideKeyboard();
    dispatch(authSignInUser({ email, password }));
    resetForm();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.bgContainer}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../../assets/images/background-image.jpg')}
        >
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <View
              style={{
                ...styles.formContainer,
                width: Dimensions.get('window').width,
                paddingBottom: isKeyboardHide ? 144 : 32,
              }}
            >
              <Text style={styles.header}>Увійти</Text>
              <TextInput
                placeholder={'Адреса електронної пошти'}
                placeholderTextColor="#bdbdbd"
                textAlign={'left'}
                keyboardType={'email-address'}
                maxLength={50}
                onSubmitEditing={onLogin}
                style={{
                  ...styles.input,
                  borderColor: focusedInput === 'email' ? '#ff6c00' : '#e8e8e8',
                }}
                value={email}
                onChangeText={emailHandler}
                onFocus={() => {
                  setIsKeyboardHide(false);
                  setFocusedInput('email');
                }}
                onBlur={() => setFocusedInput(null)}
              />
              <View>
                <TextInput
                  placeholder={'Пароль'}
                  placeholderTextColor="#bdbdbd"
                  textAlign={'left'}
                  maxLength={30}
                  onSubmitEditing={onLogin}
                  secureTextEntry={!showPassword}
                  style={{
                    ...styles.input,
                    marginTop: 16,
                    borderColor:
                      focusedInput === 'password' ? '#ff6c00' : '#e8e8e8',
                  }}
                  value={password}
                  onChangeText={passwordHandler}
                  onFocus={() => {
                    setIsKeyboardHide(false);
                    setFocusedInput('password');
                  }}
                  onBlur={() => setFocusedInput(null)}
                />
                <Text
                  style={styles.showPasswordLabel}
                  onPress={showPasswordHandler}
                >
                  {showPassword ? 'Сховати' : 'Показати'}
                </Text>
              </View>
              {isKeyboardHide ? (
                <>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={onLogin}
                  >
                    <Text style={styles.buttonTitle}>Увійти</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.registerLink}
                    onPress={() => navigation.navigate('Registration')}
                  >
                    <Text style={styles.registerLinkText}>
                      Нема акаунту? Зареєструватись
                    </Text>
                  </TouchableOpacity>
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
  bgContainer: {
    flex: 1,
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'stretch',
    flex: 1,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  formContainer: {
    paddingTop: 32,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  header: {
    marginBottom: 32,
    fontFamily: 'Roboto-Regular',
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: '#212121',
  },
  input: {
    height: 50,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#212121',
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderRadius: 8,
  },
  showPasswordLabel: {
    position: 'absolute',
    top: 30,
    right: 32,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#1B4371',
  },
  button: {
    height: 51,
    marginHorizontal: 16,
    marginTop: 43,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6c00',
    borderRadius: 100,
  },
  buttonTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
  },
  registerLink: {
    marginTop: 16,
  },
  registerLinkText: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    color: '#1B4371',
  },
});
