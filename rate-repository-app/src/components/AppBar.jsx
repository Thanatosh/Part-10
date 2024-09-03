import { View, StyleSheet, ScrollView } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: theme.colors.textPrimary,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  link: {
    textDecorationLine: 'none',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" style={styles.link}>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/signin" style={styles.link}>
          <Text style={styles.text}>Sign In</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;