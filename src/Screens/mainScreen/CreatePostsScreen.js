import { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
  Image,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import { customAlphabet } from 'nanoid/non-secure';
import { useSelector, useDispatch } from 'react-redux';

import db from '../../firebase/config';

import DownloadPhotoIcon from '../../assets/images/download-photo.svg';
import EditPhotoIcon from '../../assets/images/edit-photo.svg';
import LocationIcon from '../../assets/images/map-pin.svg';

import { dashboardResetStatus } from '../../redux/dashboard/dashboardOperations';

const INITIAL_STATE = {
  title: '',
  locality: '',
  isKeyboardHide: true,
  focusedInput: null,
  hasCameraPermission: null,
  hasGeolocationPermission: null,
  cameraRef: null,
  photo: null,
  isPhotoDownloaded: false,
};

export default function CreatePostsScreen({ navigation }) {
  const [title, setTitle] = useState(INITIAL_STATE.title);
  const [locality, setLocality] = useState(INITIAL_STATE.locality);
  const [isKeyboardHide, setIsKeyboardHide] = useState(
    INITIAL_STATE.isKeyboardHide,
  );
  const [focusedInput, setFocusedInput] = useState(INITIAL_STATE.focusedInput);
  const [hasCameraPermission, setHasCameraPermission] = useState(
    INITIAL_STATE.hasCameraPermission,
  );
  const [hasGeolocationPermission, setHasGeolocationPermission] = useState(
    INITIAL_STATE.hasGeolocationPermission,
  );

  const [cameraRef, setCameraRef] = useState(INITIAL_STATE.cameraRef);
  const [photo, setPhoto] = useState(INITIAL_STATE.photo);
  const [isPhotoDownloaded, setIsPhotoDownloaded] = useState(
    INITIAL_STATE.isPhotoDownloaded,
  );

  const { userId, nickname } = useSelector(state => state.auth);
  const { status, error } = useSelector(state => state.dashboard);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status: geolocationStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (geolocationStatus !== 'granted') {
        Alert.alert(
          'Попередження!',
          'У доступі до геолокації відмовлено. Ви маєте надати застосунку доступ до геолокації. В іншому разі ви зможете створити публікацію, але користувачі не побачать її локацію на карті.',
        );
      }
      setHasGeolocationPermission(geolocationStatus === 'granted');

      let { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        Alert.alert(
          'Помилка!',
          'У доступі до камери відмовлено. Ви повинні надати застосунку доступ до камери щоб мати можливість створити публікацію.',
        );
      }
      setHasCameraPermission(cameraStatus === 'granted');
    })();
  }, []);

  const hideKeyboard = () => {
    setIsKeyboardHide(true);
    Keyboard.dismiss();
  };

  const titleHandler = text => {
    setTitle(text);
  };

  const localityHandler = text => {
    setLocality(text);
  };

  const snapHandler = () => {
    if (isPhotoDownloaded) return setIsPhotoDownloaded(false);
    takePhoto();
  };

  const resetForm = () => {
    setTitle(INITIAL_STATE.title);
    setLocality(INITIAL_STATE.locality);
    setIsPhotoDownloaded(INITIAL_STATE.isPhotoDownloaded);
  };

  const takePhoto = async () => {
    const photo = await cameraRef.takePictureAsync();
    setPhoto(photo.uri);
    setIsPhotoDownloaded(true);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
    const uniquePostId = nanoid();

    await db.storage().ref(`postImage/${uniquePostId}`).put(file);

    const processedPhoto = await db
      .storage()
      .ref('postImage')
      .child(uniquePostId)
      .getDownloadURL();

    return processedPhoto;
  };

  const onPost = () => {
    hideKeyboard();

    (async () => {
      try {
        dispatch(updateDashboardStatus({ status: 'pending' }));

        const photoURL = await uploadPhotoToServer();

        let location = hasGeolocationPermission
          ? await Location.getCurrentPositionAsync({})
          : null;
        const coords = hasGeolocationPermission
          ? {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
          : null;

        const nanoid = customAlphabet(
          'abcdefghijklmnopqrstuvwxyz0123456789',
          10,
        );
        const post = {
          id: nanoid(),
          userId,
          nickname,
          title,
          photo: photoURL,
          likesNumber: 0,
          locationRegion: locality,
          location: coords,
        };

        await db.firestore().collection('posts').add(post);

        resetForm();
        updateDashboardStatus({ status: 'fulfilled' });
        navigation.navigate('Posts');
      } catch (error) {
        console.log('error', error);
        console.log('error.message', error.message);

        dispatch(
          updateDashboardStatus({
            status: 'rejected',
          }),
        );
        dispatch(
          updateDashboardError({
            error: error.message,
          }),
        );
      }
    })();
  };

  const onErrorAlert = () => {
    dispatch(dashboardResetStatus());
  };

  useEffect(() => {
    if (status === 'rejected')
      Alert.alert(
        'Помилка!',
        `Не вдалось створити публікацію. Повідомлення про помилку: ${error}`,
        [
          {
            text: 'OK',
            onPress: () => {
              onErrorAlert();
            },
          },
        ],
      );
    if (status === 'fulfilled') {
      resetForm();
      updateDashboardStatus({ status: 'idle' });
    }
  }, [status, error]);

  const isPublishAllowed =
    title && locality && hasCameraPermission && isPhotoDownloaded;

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
                  <Camera
                    style={styles.camera}
                    type={Camera.Constants.Type.back}
                    ref={ref => {
                      setCameraRef(ref);
                    }}
                  >
                    {photo ? (
                      <Image
                        style={{
                          ...styles.postPhoto,
                          width: isPhotoDownloaded
                            ? Dimensions.get('window').width * 0.91
                            : 0,
                          height: isPhotoDownloaded
                            ? Dimensions.get('window').width * 0.91
                            : 0,
                        }}
                        source={{ uri: photo }}
                      />
                    ) : null}
                    <TouchableOpacity
                      style={styles.photoButtonContainer}
                      activeOpacity={0.8}
                      onPress={snapHandler}
                    >
                      {isPhotoDownloaded ? (
                        <EditPhotoIcon width={60} height={60} />
                      ) : (
                        <DownloadPhotoIcon width={60} height={60} />
                      )}
                    </TouchableOpacity>
                  </Camera>
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
                borderColor:
                  focusedInput === 'location' ? '#ff6c00' : '#e8e8e8',
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
                value={locality}
                onChangeText={localityHandler}
                onFocus={() => {
                  setIsKeyboardHide(false);
                  setFocusedInput('locality');
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
                style={{
                  ...styles.button,
                  backgroundColor:
                    isPublishAllowed || status !== 'idle'
                      ? '#ff6c00'
                      : '#f6f6f6',
                }}
                disabled={!isPublishAllowed || status !== 'idle'}
                onPress={onPost}
              >
                {status === 'pending' ? (
                  <ActivityIndicator size="large" color="#0f0" />
                ) : (
                  <Text
                    style={{
                      ...styles.buttonTitle,
                      color: isPublishAllowed ? '#fff' : '#bdbdbd',
                    }}
                  >
                    {status === 'idle' && 'Опублікувати'}
                  </Text>
                )}
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
  camera: {
    height: Dimensions.get('window').width,
  },
  postPhoto: {
    flex: 1,
    resizeMode: 'cover',
  },
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
