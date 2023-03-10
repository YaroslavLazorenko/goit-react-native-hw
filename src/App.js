import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import { AuthContext } from './context';

import { store } from './redux/store';
import useRoute from './router';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const routing = useRoute(isAuth);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({ 'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf') });
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <NavigationContainer>
          <View style={styles.container} onLayout={onLayoutRootView}>
            {routing}
          </View>
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
