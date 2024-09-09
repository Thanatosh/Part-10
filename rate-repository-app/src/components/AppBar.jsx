import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import { GET_AUTHENTICATED_USER } from '../graphql/queries';
import { useApolloClient, useQuery } from '@apollo/client';
import Text from './Text';
import theme from '../theme';
import useAuthStorage from '../hooks/useAuthStorage';

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
  const { data } = useQuery(GET_AUTHENTICATED_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/signin');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" style={styles.link}>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {data?.me ? (
        <Pressable onPress={handleSignOut} style={styles.link}>
          <Text style={styles.text}>Sign out</Text>
        </Pressable>
      ) : (
        <Link to="/signin" component={Pressable} style={styles.link}>
          <Text style={styles.text}>Sign in</Text>
        </Link>
      )}
      </ScrollView>
    </View>
  );
};

export default AppBar;