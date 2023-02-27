import { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import LoginScreen from './Screens/auth/LoginScreen';
import RegistrationScreen from './Screens/auth/RegistrationScreen';
import HomeScreen from './Screens/mainScreen/HomeScreen';
import PostsScreen from './Screens/mainScreen/PostsScreen';
import CreatePostsScreen from './Screens/mainScreen/CreatePostsScreen';
import ProfileScreen from './Screens/mainScreen/ProfileScreen';
import CommentsScreen from './Screens/mainScreen/CommentsScreen';

import { AuthContext } from './context';

import SignOutIcon from './assets/images/log-out.svg';
import GoBackIcon from './assets/images/arrow-left.svg';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const TabRouter = () => {
  const { setIsAuth } = useContext(AuthContext);
  const signOut = () => {
    setIsAuth(false);
  };

  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons name="postage-stamp" size={size} color={color} />
          ),
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
          headerRight: () => <SignOutIcon style={{ marginRight: 10 }} onPress={signOut} />,
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="pluscircleo" size={size} color={color} />
          ),
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
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons name="face-man-profile" size={size} color={color} />
          ),
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
        })}
        name="Comments"
        component={CommentsScreen}
      />
    </MainStack.Navigator>
  );
}
