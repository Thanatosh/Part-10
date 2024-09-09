import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: {
          username,
          password
        },
      },
    });

    if (response?.data?.authenticate?.accessToken) {
      const accessToken = response.data.authenticate.accessToken;
      await authStorage.setAccessToken(accessToken);
      apolloClient.resetStore();
    }

    return response;
  };

  return [signIn, result];
};

export default useSignIn;
