import { View, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import useUserReviews from '../hooks/useUserReviews';
import useDeleteReview from '../hooks/useDeleteReview';
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
  buttonContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    paddingBottom: 20,
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
  viewButton: {
    backgroundColor: '#0366d6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  const navigate = useNavigate();
  const { deleteReview } = useDeleteReview();

  const handleDelete = () => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteReview(review.id) }
      ]
    );
  };

  return (
    <View>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingCircle}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewTextContainer}>
          <Text style={styles.username}>{review.repository.fullName}</Text>
          <Text style={styles.dateText}>{new Date(review.createdAt).toLocaleDateString()}</Text>
          <Text>{review.text}</Text>
        </View >
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.viewButton} onPress={() => navigate(`/repository/${review.repository.id}`)}>
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
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