import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import SignIn from './SignIn';
import SignUp from './SignUp';
import NewReview from './NewReview';
import AppBar from './AppBar';
import theme from '../theme';
import { Route, Routes } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/newreview" element={<NewReview />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </View>
  );
};

export default Main;