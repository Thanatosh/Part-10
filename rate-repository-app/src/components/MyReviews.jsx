import { View, StyleSheet, FlatList } from 'react-native';
import useUserReviews from '../hooks/useUserReviews';
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
        <Text style={styles.username}>{review.repository.fullName}</Text>
        <Text style={styles.dateText}>{new Date(review.createdAt).toLocaleDateString()}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { reviews, loading, error } = useUserReviews();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviews;