import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, { data, loading, error }] = useMutation(CREATE_USER);

  const createUser = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        user: { username, password },
      },
    });

    return response;
  };

  return [createUser, { data, loading, error }];
};

export default useSignUp;
