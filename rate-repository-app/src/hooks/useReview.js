import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [mutate, { data, loading, error }] = useMutation(CREATE_REVIEW);

  const createReview = async ({ username, repositoryName, rating, reviewDetails }) => {
    const review = {
      ownerName: username,
      repositoryName,
      rating: parseInt(rating),
      text: reviewDetails,
    };

    const response = await mutate({
      variables: {
        review,
      },
    });

    return response;
  };

  return [createReview, { data, loading, error }];
};

export default useReview;
