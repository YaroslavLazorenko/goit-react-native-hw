import { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  Platform,
  // Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { AuthContext } from '../../context';

import AddPhotoImage from '../../assets/images/add-photo.svg';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  showPassword: false,
  isKeyboardHide: true,
};

export default function RegistrationScreen({ navigation }) {
  const [name, setName] = useState(INITIAL_STATE.name);
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [password, setPassword] = useState(INITIAL_STATE.password);
  const [showPassword, setShowPassword] = useState(INITIAL_STATE.showPassword);
  const [isKeyboardHide, setIsKeyboardHide] = useState(INITIAL_STATE.isKeyboardHide);
  const [focusedInput, setFocusedInput] = useState(null);

  const { setIsAuth } = useContext(AuthContext);

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
    setShowPassword(INITIAL_STATE.showPassword);
  };

  const onSignup = () => {
    console.log('Signup credentials:');
    console.log('name: ', name);
    console.log('email: ', email);
    console.log('password: ', password);
    hideKeyboard();
    resetForm();
    setIsAuth(true);
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
                paddingBottom: isKeyboardHide ? 78 : 32,
              }}
            >
              <View style={styles.photoContainer}>
                {/* <Image
                  style={styles.userPhoto}
                  source={require('../assets/images/user-photo.jpg')}
                /> */}
                <View style={styles.photoButtonContainer}>
                  <AddPhotoImage width={25} height={25} />
                </View>
              </View>
              <Text style={styles.header}>Реєстрація</Text>
              <TextInput
                placeholder={"Ім'я"}
                placeholderTextColor="#bdbdbd"
                textAlign={'left'}
                maxLength={40}
                onSubmitEditing={onSignup}
                style={{
                  ...styles.input,
                  borderColor: focusedInput === 'name' ? '#ff6c00' : '#e8e8e8',
                }}
                value={name}
                onChangeText={nameHandler}
                onFocus={() => {
                  setIsKeyboardHide(false);
                  setFocusedInput('name');
                }}
                onBlur={() => setFocusedInput(null)}
              />
              <TextInput
                placeholder={'Адреса електронної пошти'}
                placeholderTextColor="#bdbdbd"
                textAlign={'left'}
                keyboardType={'email-address'}
                maxLength={50}
                onSubmitEditing={onSignup}
                style={{
                  ...styles.input,
                  marginTop: 16,
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
                  onSubmitEditing={onSignup}
                  secureTextEntry={!showPassword}
                  style={{
                    ...styles.input,
                    marginTop: 16,
                    borderColor: focusedInput === 'password' ? '#ff6c00' : '#e8e8e8',
                  }}
                  value={password}
                  onChangeText={passwordHandler}
                  onFocus={() => {
                    setIsKeyboardHide(false);
                    setFocusedInput('password');
                  }}
                  onBlur={() => setFocusedInput(null)}
                />
                <Text style={styles.showPasswordLabel} onPress={showPasswordHandler}>
                  {showPassword ? 'Сховати' : 'Показати'}
                </Text>
              </View>
              {isKeyboardHide ? (
                <>
                  <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onSignup}>
                    <Text style={styles.buttonTitle}>Зареєструватись</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.loginLink}
                    onPress={() => navigation.navigate('Login')}
                  >
                    <Text style={styles.loginLinkText}>Вже є акаунт? Увійти</Text>
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
    paddingTop: 92,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  photoContainer: {
    position: 'absolute',
    top: -60,
    left: Dimensions.get('window').width * 0.5 - 60,
    flex: 1,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#f6f6f6',
  },
  // userPhoto: {},
  photoButtonContainer: {
    position: 'absolute',
    top: 81,
    left: 107,
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
  loginLink: {
    marginTop: 16,
  },
  loginLinkText: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    color: '#1B4371',
  },
});
