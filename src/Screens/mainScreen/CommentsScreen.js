import { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';

import db from '../../firebase/config';

import SendCommentButtonIcon from '../../assets/images/send-comment.svg';

const INITIAL_STATE = {
  comment: '',
  isKeyboardHide: true,
  focusedInput: false,
};

const months = [
  'січня',
  'лютого',
  'березня',
  'квітня',
  'травня',
  'червня',
  'липня',
  'серпня',
  'вересня',
  'жовтня',
  'листопада',
  'грудня',
];

const UpperComponent = ({ photo }) => {
  return (
    <View style={styles.postPhotoContainer}>
      <Image style={styles.postPhoto} source={{ uri: photo }} />
    </View>
  );
};

const CommentsListItem = ({ item }) => {
  const { userId: ownerId, time, comment } = item;
  const { userId } = useSelector(state => state.auth);
  const isOwner = ownerId === userId;

  return (
    <View
      style={{
        ...styles.commentContainer,
        flexDirection: isOwner ? 'row-reverse' : 'row',
      }}
    >
      <View style={styles.userPhotoContainer}>
        <Image
          style={styles.userPhoto}
          source={
            isOwner
              ? require('../../assets/images/user-photo.jpg')
              : require('../../assets/images/1234567890-photo.jpg')
          }
        />
      </View>
      <View
        style={{
          ...styles.commentTextContainer,
          marginRight: isOwner ? 16 : 0,
          marginLeft: isOwner ? 0 : 16,
          borderTopLeftRadius: isOwner ? 6 : 0,
          borderTopRightRadius: isOwner ? 0 : 6,
        }}
      >
        <Text style={styles.text}>{comment}</Text>
        <Text style={{ ...styles.time, textAlign: isOwner ? 'left' : 'right' }}>
          {time}
        </Text>
      </View>
    </View>
  );
};

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState(INITIAL_STATE.comment);
  const [allComments, setAllComments] = useState([]);
  const [isKeyboardHide, setIsKeyboardHide] = useState(
    INITIAL_STATE.isKeyboardHide,
  );
  const [focusedInput, setFocusedInput] = useState(INITIAL_STATE.focusedInput);

  const { userId } = useSelector(state => state.auth);

  const { photo, postId } = route.params;
  const isCommentsExist = allComments.length > 0;

  const getDateTime = () => {
    const date = new Date();

    const mins = date.getMinutes();
    const minutes = mins < 10 ? '0' + mins.toString() : mins.toString();

    return `${date.getDate()} ${
      months[date.getMonth() + 1]
    }, ${date.getFullYear()} | ${date.getHours()}:${minutes}`;
  };

  const createComment = async () => {
    await db
      .firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .add({ comment, userId, time: getDateTime() });
  };

  const getAllComments = async () => {
    db.firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .onSnapshot(data =>
        setAllComments(data.docs.map(doc => ({ ...doc.data(), id: doc.id }))),
      );
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const hideKeyboard = () => {
    setIsKeyboardHide(true);
    Keyboard.dismiss();
  };

  const commentHandler = text => {
    setComment(text);
  };

  const resetForm = () => {
    setComment(INITIAL_STATE.comment);
  };

  const onComment = () => {
    console.log('Comment:', comment);
    hideKeyboard();
    createComment();
    resetForm();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          {isKeyboardHide && isCommentsExist ? (
            <FlatList
              data={allComments}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => false} activeOpacity={1}>
                    {index === 0 && <UpperComponent photo={photo} />}
                    <CommentsListItem item={item} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          ) : (
            <>
              {isKeyboardHide && (
                <>
                  <UpperComponent photo={photo} />
                  <Text style={styles.label}>There are no comments yet...</Text>
                </>
              )}
            </>
          )}
          <View>
            <TextInput
              placeholder={'Коментувати...'}
              placeholderTextColor="#bdbdbd"
              textAlign={'left'}
              maxLength={200}
              onSubmitEditing={onComment}
              style={{
                ...styles.input,
                borderColor: focusedInput ? '#ff6c00' : '#e8e8e8',
              }}
              value={comment}
              onChangeText={commentHandler}
              onFocus={() => {
                setIsKeyboardHide(false);
                setFocusedInput(true);
              }}
              onBlur={() => setFocusedInput(false)}
            />
            <TouchableOpacity
              style={styles.sendCommentButton}
              onPress={onComment}
            >
              <SendCommentButtonIcon />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: Dimensions.get('window').width * 0.045,
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  postPhotoContainer: {
    width: Dimensions.get('window').width * 0.91,
    marginBottom: 32,
    borderRadius: 8,
    backgroundColor: '#f6f6f6',
    overflow: 'hidden',
  },
  postPhoto: {
    width: Dimensions.get('window').width * 0.91,
    height: 240,
    resizeMode: 'cover',
  },
  commentContainer: {
    marginBottom: 24,
  },
  userPhotoContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f6f6f6',
    overflow: 'hidden',
  },
  userPhoto: {
    width: 28,
    height: 28,
    resizeMode: 'cover',
  },
  commentTextContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  text: {
    marginBottom: 8,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
  },
  time: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    color: '#bdbdbd',
  },
  label: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 18,
    color: '#212121',
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    marginTop: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '500',
    color: '#212121',
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderRadius: 100,
  },
  sendCommentButton: {
    position: 'absolute',
    top: 24,
    right: 8,
  },
});
