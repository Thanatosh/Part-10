import { View, StyleSheet, Pressable, Image, Linking } from 'react-native';
import Text from './Text';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
    marginTop: 5,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  language: {
    color: 'white',
    backgroundColor: '#0366d6',
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 2,
  },
  countsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  countItem: {
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: '#0366d6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const RepositoryItem = ({ item, showUrlButton }) => {
  const navigate = useNavigate();

  return (
    <View testID="repositoryItem" style={styles.container}>
      <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
        <View style={styles.header}>
          <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
            <Text color="textSecondary">{item.description}</Text>
            <Text style={styles.language}>{item.language}</Text>
          </View>
        </View>
        <View style={styles.countsContainer}>
          <View style={styles.countItem}>
            <Text fontWeight="bold">{formatCount(item.stargazersCount)}</Text>
            <Text>Stars</Text>
          </View>
          <View style={styles.countItem}>
            <Text fontWeight="bold">{formatCount(item.forksCount)}</Text>
            <Text>Forks</Text>
          </View>
          <View style={styles.countItem}>
            <Text fontWeight="bold">{formatCount(item.reviewCount)}</Text>
            <Text>Reviews</Text>
          </View>
          <View style={styles.countItem}>
            <Text fontWeight="bold">{item.ratingAverage}</Text>
            <Text>Rating</Text>
          </View>
        </View>
      </Pressable>
      
      {showUrlButton && (
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;