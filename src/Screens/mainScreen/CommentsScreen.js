import { useState } from 'react';
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

import SendCommentButtonIcon from '../../assets/images/send-comment.svg';

import { userData } from '../../userData';

const INITIAL_STATE = {
  comment: '',
  isKeyboardHide: true,
  focusedInput: false,
};

const UpperComponent = ({ photo }) => {
  return (
    <View style={styles.postPhotoContainer}>
      <Image style={styles.postPhoto} source={photo} />
    </View>
  );
};

const CommentsListItem = ({ item }) => {
  const { ownerId, ownerPhoto, date, text } = item;
  const isOwner = ownerId === userData.id;

  return (
    <View
      style={{
        ...styles.commentContainer,
        flexDirection: isOwner ? 'row-reverse' : 'row',
      }}
    >
      <View style={styles.userPhotoContainer}>
        <Image style={styles.userPhoto} source={ownerPhoto} />
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
        <Text style={styles.text}>{text}</Text>
        <Text style={{ ...styles.date, textAlign: isOwner ? 'left' : 'right' }}>{date}</Text>
      </View>
    </View>
  );
};

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState(INITIAL_STATE.comment);
  const [isKeyboardHide, setIsKeyboardHide] = useState(INITIAL_STATE.isKeyboardHide);
  const [focusedInput, setFocusedInput] = useState(INITIAL_STATE.focusedInput);

  const { comments, photo } = route.params;
  const isCommentsExist = comments.length > 0;

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
              data={comments}
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
            <TouchableOpacity style={styles.sendCommentButton} onPress={onComment}>
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
  date: {
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
