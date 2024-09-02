import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: theme.colors.barBackground,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
  },
});

const AppBar = () => {
  return (
    <Pressable onPress={() => { /* ... */ }}>
      <View style={styles.container}>
        <Text style={{ color: 'white' }} fontWeight="bold" fontSize="subheading">Repositories</Text>
      </View>
    </Pressable>
  );
};

export default AppBar;