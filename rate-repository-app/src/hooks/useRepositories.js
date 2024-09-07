import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  const repositories = data?.repositories?.edges
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return { repositories, loading, refetch, error };
};

export default useRepositories;
