import { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerContainer: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderBottomWidth: 5,
    borderBottomColor: '#0366d6',
    backgroundColor: '#e1e4e8',
  },
  picker: {
    height: 50,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => (
    <RepositoryItem item={item} showUrlButton={false} />
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  
  const getOrderingOptions = (selectedOrder) => {
    switch (selectedOrder) {
      case 'highest':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      case 'lowest':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      case 'latest':
      default:
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    }
  };

  const { orderBy, orderDirection } = getOrderingOptions(selectedOrder);
  const { repositories, loading, error } = useRepositories({ orderBy, orderDirection });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedOrder}
          onValueChange={(itemValue) => setSelectedOrder(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highest" />
          <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
      </View>
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

export default RepositoryList;