import { useState } from 'react';
import {
  View,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  // Image,
  Text,
  Alert,
  TextInput,
  StyleSheet,
} from 'react-native';

import DownloadPhotoImage from '../../assets/images/download-photo.svg';

const INITIAL_STATE = {
  name: '',
  isPhotoDownloaded: false,
  isKeyboardHide: true,
};

export default function CreatePostsScreen() {
  const [isPhotoDownloaded, setIsPhotoDownloaded] = useState(INITIAL_STATE.isPhotoDownloaded);
  const [name, setName] = useState(INITIAL_STATE.name);
  const [isKeyboardHide, setIsKeyboardHide] = useState(INITIAL_STATE.isKeyboardHide);

  const hideKeyboard = () => {
    setIsKeyboardHide(true);
    Keyboard.dismiss();
  };

  const nameHandler = text => {
    setName(text);
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={styles.postPhotoContainer}>
            {/* <Image style={styles.postPhoto} source={} /> */}
            <View style={styles.photoButtonContainer}>
              <DownloadPhotoImage
                width={60}
                height={60}
                onPress={() => {
                  Alert.alert('Alert', 'This functionality is under development...');
                }}
              />
            </View>
          </View>
          <Text>{isPhotoDownloaded ? 'Редагувати фото' : 'Завантажте фото'}</Text>
          <TextInput
            placeholder={'Назва'}
            placeholderTextColor="#bdbdbd"
            textAlign={'left'}
            maxLength={40}
            // onSubmitEditing={onSignup}
            style={{
              ...styles.input,
              // borderColor: focusedInput === 'name' ? '#ff6c00' : '#e8e8e8',
            }}
            value={name}
            onChangeText={nameHandler}
            onFocus={() => {
              setIsKeyboardHide(false);
              // setFocusedInput('name');
            }}
            // onBlur={() => setFocusedInput(null)}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: Dimensions.get('window').width * 0.045,
    paddingTop: 32,
    backgroundColor: '#fff',
  },
  postPhotoContainer: {
    width: Dimensions.get('window').width * 0.91,
    height: 240,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 8,
    backgroundColor: '#f6f6f6',
    overflow: 'hidden',
  },
  // postPhoto: {
  //   resizeMode: 'cover',
  // },
  photoButtonContainer: {
    position: 'absolute',
    top: 90,
    left: Dimensions.get('window').width * 0.455 - 30,
  },
});
