import { useQuery } from '@apollo/client';
import { GET_AUTHENTICATED_USER } from '../graphql/queries';

const useUserReviews = () => {
  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node) || [];
  const id = data?.me?.id

  return {
    id,
    reviews,
    loading,
    error,
  };
};

export default useUserReviews;
