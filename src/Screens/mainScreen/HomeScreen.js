import { useEffect } from 'react';
import { View, Button } from 'react-native';
export default function HomeScreen({ navigation }) {
  useEffect(() => {
    navigation.navigate('Tabs', { screen: 'Posts' });
  }, []);

  return null;
}
