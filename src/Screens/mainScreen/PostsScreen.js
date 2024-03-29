import { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';

import db from '../../firebase/config';

import CommentsIcon from '../../assets/images/comments.svg';
import LocationIcon from '../../assets/images/map-pin.svg';

const PostListItem = ({ item, navigation }) => {
  const [allComments, setAllComments] = useState([]);

  const { id, photo, title, locationRegion, locationCountry, location } = item;

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

  const onMap = () => {
    if (!location)
      return Alert.alert(
        'Повідомлення',
        'Автор не надав геолокацію для публікації',
      );
    navigation.navigate('Map', item);
  };

  const commentsNumber = allComments.length;

  return (
    <View>
      <View style={styles.postPhotoContainer}>
        <Image style={styles.postPhoto} source={{ uri: photo }} />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.postDescriptionContainer}>
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
          <TouchableOpacity
            style={styles.postLocationContainer}
            activeOpacity={0.6}
            onPress={onMap}
          >
            <LocationIcon />
            <Text style={styles.postLocation}>
              {locationCountry
                ? `${locationRegion}, ${locationCountry}`
                : locationRegion}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const { email, nickname } = useSelector(state => state.auth);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.userPhotoContainer}>
          <Image
            style={styles.userPhoto}
            source={require('../../assets/images/user-photo.jpg')}
          />
        </View>
        <View style={styles.userDataContainer}>
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostListItem item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
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
  userContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  userPhotoContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#f6f6f6',
    overflow: 'hidden',
  },
  userPhoto: {
    flex: 1,
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  userDataContainer: {
    justifyContent: 'center',
    paddingLeft: 8,
  },
  nickname: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 15,
    color: '#212121',
  },
  email: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 13,
    color: 'rgba(33, 33, 33, 0.8)',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  postCommentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postCommentsNumber: {
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
