import { useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  // Image,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import DownloadPhotoImage from '../../assets/images/download-photo.svg';
import LocationIcon from '../../assets/images/map-pin.svg';

const INITIAL_STATE = {
  title: '',
  location: '',
  isPhotoDownloaded: false,
  isKeyboardHide: true,
  focusedInput: null,
};

export default function CreatePostsScreen() {
  const [isPhotoDownloaded, setIsPhotoDownloaded] = useState(INITIAL_STATE.isPhotoDownloaded);
  const [title, setTitle] = useState(INITIAL_STATE.title);
  const [location, setLocation] = useState(INITIAL_STATE.location);
  const [isKeyboardHide, setIsKeyboardHide] = useState(INITIAL_STATE.isKeyboardHide);
  const [focusedInput, setFocusedInput] = useState(INITIAL_STATE.focusedInput);

  const hideKeyboard = () => {
    setIsKeyboardHide(true);
    Keyboard.dismiss();
  };

  const titleHandler = text => {
    setTitle(text);
  };

  const locationHandler = text => {
    setLocation(text);
  };

  const resetForm = () => {
    setTitle(INITIAL_STATE.title);
    setLocation(INITIAL_STATE.location);
    setIsPhotoDownloaded(INITIAL_STATE.isPhotoDownloaded);
  };

  const onPost = () => {
    console.log('Create post data:');
    console.log('title: ', title);
    console.log('location: ', location);
    hideKeyboard();
    resetForm();
  };

  const isDataEntered = title && location;

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            {isKeyboardHide ? (
              <>
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
                <Text style={styles.photoMessage}>
                  {isPhotoDownloaded ? 'Редагувати фото' : 'Завантажте фото'}
                </Text>
              </>
            ) : null}
            <View
              style={{
                ...styles.inputContainer,
                marginBottom: 16,
                borderColor: focusedInput === 'title' ? '#ff6c00' : '#e8e8e8',
              }}
            >
              <TextInput
                placeholder={'Назва...'}
                placeholderTextColor="#bdbdbd"
                textAlign={'left'}
                maxLength={40}
                onSubmitEditing={hideKeyboard}
                style={{ ...styles.input, fontWeight: '500' }}
                value={title}
                onChangeText={titleHandler}
                onFocus={() => {
                  setIsKeyboardHide(false);
                  setFocusedInput('title');
                }}
                onBlur={() => {
                  setFocusedInput(null);
                  setIsKeyboardHide(true);
                }}
              />
            </View>
            <View
              style={{
                ...styles.inputContainer,
                ...styles.locationContainer,
                borderColor: focusedInput === 'location' ? '#ff6c00' : '#e8e8e8',
              }}
            >
              <LocationIcon />
              <TextInput
                placeholder={'Місцевість...'}
                placeholderTextColor="#bdbdbd"
                textAlign={'left'}
                maxLength={40}
                onSubmitEditing={hideKeyboard}
                style={{ ...styles.input, marginLeft: 4 }}
                value={location}
                onChangeText={locationHandler}
                onFocus={() => {
                  setIsKeyboardHide(false);
                  setFocusedInput('location');
                }}
                onBlur={() => {
                  setFocusedInput(null);
                  setIsKeyboardHide(true);
                }}
              />
            </View>
            {isKeyboardHide ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ ...styles.button, backgroundColor: isDataEntered ? '#ff6c00' : '#f6f6f6' }}
                disabled={!isDataEntered}
                onPress={onPost}
              >
                <Text
                  style={{
                    ...styles.buttonTitle,
                    color: isDataEntered ? '#fff' : '#bdbdbd',
                  }}
                >
                  Опублікувати
                </Text>
              </TouchableOpacity>
            ) : null}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: Dimensions.get('window').width * 0.045,
    paddingVertical: 32,
    backgroundColor: '#fff',
  },
  postPhotoContainer: {
    width: Dimensions.get('window').width * 0.91,
    height: 240,
    marginBottom: 8,
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
  photoMessage: {
    marginBottom: 32,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  inputContainer: {
    width: Dimensions.get('window').width * 0.91,
    height: 50,
    borderBottomWidth: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  button: {
    height: 51,
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  buttonTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
  },
});
