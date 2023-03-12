import { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Text,
  Image,
  Alert,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import db from '../../firebase/config';

import { authSignOutUser } from '../../redux/auth/authOperations';

import RemovePhotoImage from '../../assets/images/remove-photo.svg';
import SignOutIcon from '../../assets/images/log-out.svg';
import CommentsIcon from '../../assets/images/comments.svg';
import ThumbsUpIcon from '../../assets/images/thumbs-up.svg';
import LocationIcon from '../../assets/images/map-pin.svg';

const UpperComponent = () => {
  const dispatch = useDispatch();
  const { nickname } = useSelector(state => state.auth);

  const signOut = () => {
    dispatch(authSignOutUser());
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
          <Image
            style={styles.userPhoto}
            source={require('../../assets/images/user-photo.jpg')}
          />
        </View>
        <View style={styles.photoButtonContainer}>
          <RemovePhotoImage
            onPress={() => {
              Alert.alert(
                'Alert',
                'This functionality is under development...',
              );
            }}
          />
        </View>
      </View>
      <View style={styles.signoutButtonContainer}>
        <SignOutIcon onPress={signOut} />
      </View>
      <Text style={styles.nickname}>{nickname}</Text>
    </View>
  );
};

const PostListItem = ({ item, navigation }) => {
  const [allComments, setAllComments] = useState([]);

  const { id, photo, title, likesNumber, locationRegion } = item;

  const getAllComments = async () => {
    db.firestore()
      .collection('posts')
      .doc(id)
      .collection('comments')
      .onSnapshot(data =>
        setAllComments(data.docs.map(doc => ({ ...doc.data(), id: doc.id }))),
      );
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const commentsNumber = allComments.length;

  return (
    <View style={styles.postItemContainer}>
      <View style={styles.postPhotoContainer}>
        <Image style={styles.postPhoto} source={{ uri: photo }} />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.postDescriptionContainer}>
          <View style={styles.postReactionsContainer}>
            <TouchableOpacity
              style={styles.postCommentsContainer}
              activeOpacity={0.6}
              onPress={() =>
                navigation.navigate('Comments', { postId: id, photo })
              }
            >
              <CommentsIcon
                fill={commentsNumber === 0 ? '#fff' : '#ff6c00'}
                style={{ color: commentsNumber === 0 ? '#bdbdbd' : '#fff' }}
              />
              <Text
                style={{
                  ...styles.postCommentsNumber,
                  color: commentsNumber === 0 ? '#bdbdbd' : '#212121',
                }}
              >
                {commentsNumber}
              </Text>
            </TouchableOpacity>
            <View style={styles.postLikesContainer}>
              <ThumbsUpIcon
                style={{ color: likesNumber === 0 ? '#bdbdbd' : '#ff6c00' }}
              />
              <Text
                style={{
                  ...styles.postLikesNumber,
                  color: likesNumber === 0 ? '#bdbdbd' : '#212121',
                }}
              >
                {likesNumber}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.postLocationContainer}
            activeOpacity={0.6}
            onPress={() => navigation.navigate('Map', item)}
          >
            <LocationIcon />
            <Text style={styles.postLocation}>{locationRegion}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function ProfileScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const getAllPost = () => {
    db.firestore()
      .collection('posts')
      .onSnapshot(data =>
        setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id }))),
      );
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <SafeAreaView style={styles.bgContainer}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../../assets/images/background-image.jpg')}
      >
        <FlatList
          data={posts}
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
  nickname: {
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
    width: Dimensions.get('window').width * 0.91,
    height: 240,
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
