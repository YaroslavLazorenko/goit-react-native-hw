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

export default function RegistrationScreen() {
  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
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
                <Image style={styles.addPhoto} source={require('../assets/images/add-photo.svg')} />
              </View>
              <Text>Реєстрація</Text>
              <TextInput placeholder={"Ім'я"} textAlign={'left'} style={styles.input} />
              <TextInput
                placeholder={'Адреса електронної пошти'}
                textAlign={'left'}
                style={styles.input}
              />
              <View>
                <TextInput
                  placeholder={'Пароль'}
                  textAlign={'left'}
                  secureTextEntry={true}
                  style={styles.input}
                />
                <Text>Показати</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.button}>
                <Text style={styles.buttonTitle}>Зареєструватись</Text>
              </TouchableOpacity>
              <Text>Вже є акаунт? Увійти</Text>
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
  formContainer: {
    flex: 1,
  },
  userPhoto: {},
  addPhoto: { width: 25, height: 25, color: '#f00' },
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
