import React from 'react';
import { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
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
    borderBottomWidth: 3,
    borderBottomColor: '#0366d6',
    backgroundColor: '#e1e4e8',
  },
  picker: {
    height: 50,
  },
  search: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 3,
    borderColor: '#0366d6',
    borderWidth: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component{
  renderHeader = () => {
    const { searchQuery, setSearchQuery, selectedOrder, setSelectedOrder } = this.props;

    return (
      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.search}
        />
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
      </View>
    );
  };

  renderItem = ({ item }) => (
    <RepositoryItem item={item} showUrlButton={false} />
  );

  render() {
    const { repositories } = this.props;
    const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedValue] = useDebounce(searchQuery, 1000)
  
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
  const { repositories, loading, error } = useRepositories({ 
    orderBy, 
    orderDirection,
    searchKeyword: debouncedValue
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <RepositoryListContainer 
      repositories={repositories}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
    />
  );
};

export default RepositoryList;