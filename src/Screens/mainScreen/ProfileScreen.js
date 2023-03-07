import { useContext } from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Text,
  Image,
  Alert,
  FlatList,
  StyleSheet,
} from 'react-native';

import { AuthContext } from '../../context';

import RemovePhotoImage from '../../assets/images/remove-photo.svg';
import SignOutIcon from '../../assets/images/log-out.svg';
import CommentsIcon from '../../assets/images/comments.svg';
import ThumbsUpIcon from '../../assets/images/thumbs-up.svg';
import LocationIcon from '../../assets/images/map-pin.svg';

import { userData } from '../../userData';

const UpperComponent = () => {
  const { setIsAuth } = useContext(AuthContext);

  const signOut = () => {
    setIsAuth(false);
  };

  return (
    <View
      style={{
        ...styles.profileContainer,
        width: Dimensions.get('window').width,
      }}
    >
      <View style={styles.photoContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.userPhoto} source={require('../../assets/images/user-photo.jpg')} />
        </View>
        <View style={styles.photoButtonContainer}>
          <RemovePhotoImage
            onPress={() => {
              Alert.alert('Alert', 'This functionality is under development...');
            }}
          />
        </View>
      </View>
      <View style={styles.signoutButtonContainer}>
        <SignOutIcon onPress={signOut} />
      </View>
      <Text style={styles.name}>{userData.name}</Text>
    </View>
  );
};

const PostListItem = ({ item, navigation }) => {
  return (
    <View style={styles.postItemContainer}>
      <View style={styles.postPhotoContainer}>
        <Image style={styles.postPhoto} source={item.photo} />
      </View>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.postDescriptionContainer}>
          <View style={styles.postReactionsContainer}>
            <View style={styles.postCommentsContainer}>
              <CommentsIcon
                fill={item.commentsNumber === 0 ? '#fff' : '#ff6c00'}
                style={{ color: item.commentsNumber === 0 ? '#bdbdbd' : '#fff' }}
                onPress={() => navigation.navigate('Comments')}
              />
              <Text
                style={{
                  ...styles.postCommentsNumber,
                  color: item.commentsNumber === 0 ? '#bdbdbd' : '#212121',
                }}
              >
                {item.commentsNumber}
              </Text>
            </View>
            <View style={styles.postLikesContainer}>
              <ThumbsUpIcon style={{ color: item.likesNumber === 0 ? '#bdbdbd' : '#ff6c00' }} />
              <Text
                style={{
                  ...styles.postLikesNumber,
                  color: item.likesNumber === 0 ? '#bdbdbd' : '#212121',
                }}
              >
                {item.likesNumber}
              </Text>
            </View>
          </View>
          <View style={styles.postLocationContainer}>
            <LocationIcon />
            <Text style={styles.postLocation}>{item.locationCountry}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.bgContainer}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../../assets/images/background-image.jpg')}
      >
        <FlatList
          data={userData.posts}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            return (
              <>
                {index === 0 && <UpperComponent />}
                <PostListItem item={item} navigation={navigation} />
              </>
            );
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 92,
    marginTop: 103,
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
  },
  imageContainer: {
    flex: 1,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#f6f6f6',
    overflow: 'hidden',
  },
  userPhoto: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  signoutButtonContainer: {
    position: 'absolute',
    top: 22,
    right: 16,
  },
  photoButtonContainer: {
    position: 'absolute',
    top: 75,
    left: 101,
  },
  name: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 33,
  },
  postItemContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: Dimensions.get('window').width * 0.045,
    backgroundColor: '#fff',
  },
  postPhotoContainer: {
    flex: 1,
    width: Dimensions.get('window').width * 0.91,
    borderRadius: 8,
    backgroundColor: '#f6f6f6',
    overflow: 'hidden',
  },
  postPhoto: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    marginVertical: 8,
    fontFamily: 'Roboto-Regular',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  postDescriptionContainer: {
    width: Dimensions.get('window').width * 0.91,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  postReactionsContainer: {
    flexDirection: 'row',
  },
  postCommentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  postCommentsNumber: {
    marginLeft: 6,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
  },
  postLikesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postLikesNumber: {
    marginLeft: 6,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
  },
  postLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postLocation: {
    marginLeft: 4,
    fontFamily: 'Roboto-Regular',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: 'underline',
    color: '#212121',
  },
});
