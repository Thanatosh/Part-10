import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, loading, error, refetch } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  const repository = data?.repository || null;

  return { repository, loading, error, refetch };
};

export default useRepository;
