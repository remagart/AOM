/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import AppNavigator from "./navigation/AppNavigator";
import NavigationHelper from "./Utils/NavigationHelper";

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <AppNavigator 
        ref = {(nav) => {NavigationHelper.navigatorRef = nav;}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
});

export default App;
