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

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const TabRouter = () => {
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons name="postage-stamp" size={size} color={color} />
          ),
        }}
        name="Публікації"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="pluscircleo" size={size} color={color} />
          ),
        }}
        name="Створити публікацію"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons name="face-man-profile" size={size} color={color} />
          ),
          headerShown: false,
        }}
        name="Профіль"
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
        options={{
          headerShown: false,
        }}
        name="Comments"
        component={CommentsScreen}
      />
    </MainStack.Navigator>
  );
}
