import { useParams } from 'react-router-native';
import { View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
});

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, error } = useRepository(id);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      {repository ? (
        <RepositoryItem item={repository} showUrlButton={true} />
      ) : (
        <Text>Repository not found</Text>
      )}
    </View>
  );
};

export default SingleRepository;
