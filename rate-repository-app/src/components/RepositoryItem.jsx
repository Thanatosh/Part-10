import { View, Text } from 'react-native';

const RepositoryItem = ({ item }) => (
  <View>
    <View>
      <View>
        <Text>Full name: {item.fullName}</Text>
        <Text>Description: {item.description}</Text>
        <Text>Language: {item.language}</Text>
      </View>
    </View>
    <View>
      <View>
        <Text>Stars: {item.stargazersCount}</Text>
      </View>
      <View>
        <Text>Forks: {item.forksCount}</Text>
      </View>
      <View>
        <Text>Reviews: {item.reviewCount}</Text>
      </View>
      <View>
        <Text>Rating: {item.ratingAverage}</Text>
      </View>
    </View>
  </View>
);

export default RepositoryItem;