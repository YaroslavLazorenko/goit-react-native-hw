import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';

import LoginScreen from './Screens/auth/LoginScreen';
import RegistrationScreen from './Screens/auth/RegistrationScreen';
import HomeScreen from './Screens/mainScreen/HomeScreen';
import PostsScreen from './Screens/mainScreen/PostsScreen';
import CreatePostsScreen from './Screens/mainScreen/CreatePostsScreen';
import ProfileScreen from './Screens/mainScreen/ProfileScreen';
import CommentsScreen from './Screens/mainScreen/CommentsScreen';
import MapScreen from './Screens/mainScreen/MapScreen';

import { authSignOutUser } from './redux/auth/authOperations';

import SignOutIcon from './assets/images/log-out.svg';
import GoBackIcon from './assets/images/arrow-left.svg';
import PostsFocusedIcon from './assets/images/posts-focused.svg';
import PostsUnfocusedIcon from './assets/images/posts-unfocused.svg';
import CreatePostFocusedIcon from './assets/images/create-post-focused.svg';
import CreatePostUnfocusedIcon from './assets/images/create-post-unfocused.svg';
import ProfileFocusedIcon from './assets/images/profile-focused.svg';
import ProfileUnfocusedIcon from './assets/images/profile-unfocused.svg';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const TabRouter = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <PostsFocusedIcon /> : <PostsUnfocusedIcon />;
          },
          title: 'Публікації',
          headerTitleAlign: 'center',
          headerStyle: {
            height: 88,
            backgroundColor: '#fff',
          },
          headerTintColor: '#212121',
          headerTitleStyle: {
            fontFamily: 'Roboto-Regular',
            fontWeight: '500',
            fontSize: 17,
          },
          headerRight: () => (
            <SignOutIcon style={{ marginRight: 16 }} onPress={signOut} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <CreatePostFocusedIcon />
            ) : (
              <CreatePostUnfocusedIcon />
            );
          },
          title: 'Створити публікацію',
          headerTitleAlign: 'center',
          headerStyle: {
            height: 88,
            backgroundColor: '#fff',
          },
          headerTintColor: '#212121',
          headerTitleStyle: {
            fontFamily: 'Roboto-Regular',
            fontWeight: '500',
            fontSize: 17,
          },
          headerLeft: () => (
            <GoBackIcon
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? <ProfileFocusedIcon /> : <ProfileUnfocusedIcon />;
          },
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeScreen}
      />
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="Tabs"
        component={TabRouter}
      />
      <MainStack.Screen
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <GoBackIcon
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          title: 'Коментарі',
          headerTitleAlign: 'center',
          headerStyle: {
            height: 88,
            backgroundColor: '#fff',
          },
          headerTintColor: '#212121',
          headerTitleStyle: {
            fontFamily: 'Roboto-Regular',
            fontWeight: '500',
            fontSize: 17,
          },
        })}
        name="Comments"
        component={CommentsScreen}
      />
      <MainStack.Screen
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <GoBackIcon
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          title: 'Карта',
          headerTitleAlign: 'center',
          headerStyle: {
            height: 88,
            backgroundColor: '#fff',
          },
          headerTintColor: '#212121',
          headerTitleStyle: {
            fontFamily: 'Roboto-Regular',
            fontWeight: '500',
            fontSize: 17,
          },
        })}
        name="Map"
        component={MapScreen}
      />
    </MainStack.Navigator>
  );
}
