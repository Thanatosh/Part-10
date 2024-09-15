import { useParams } from 'react-router-native';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  reviewContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: 10,
    padding: 8,
  },
  ratingCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0366d6',
    justifyContent: 'center', 
    alignItems: 'center',
    margin: 8, 
  },
  reviewTextContainer: {
    padding: 5,
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
  },
  ratingText: {
    fontWeight: 'bold',
    color: '#0366d6',
  },
  dateText: {
    color: '#586069',
  }
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingCircle}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewTextContainer}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.dateText}>{new Date(review.createdAt).toLocaleDateString()}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.container}>
      {repository ? (
        <RepositoryItem item={repository} showUrlButton={true} />
      ) : (
        <Text>Repository not found</Text>
      )}
    </View>
  )
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, error, fetchMore, loadingMore } = useRepository(id, 6);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = repository.reviews.edges.map(edge => edge.node);

  const onEndReached = () => {
    if (repository.reviews.pageInfo.hasNextPage) {
      fetchMore();
    }
  };

  const renderFooter = () => {
    if (!loadingMore || !repository.reviews.pageInfo.hasNextPage) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="#0366d6" />
      </View>
    );
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

export default SingleRepository;
