import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import Text from './Text';
import * as yup from 'yup';

const SignUpValidation = yup.object().shape({
  username: yup.string().min(5).max(30).required('Username name is required'),
  password: yup.string().min(5).max(30).required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password confirmation must match password')
    .required('Password confirmation is required'),
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexGrow: 1,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  errorInput: {
    borderColor: '#d73a4a',
  },
  button: {
    backgroundColor: '#0366d6',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#d73a4a',
    marginBottom: 10,
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

export const SignUpContainer = ({ formik }) => {
  return (
    <View testID="SignUpItem" style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username && formik.errors.username && styles.errorInput
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.password && formik.errors.password && styles.errorInput
        ]}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.passwordConfirm && formik.errors.passwordConfirm && styles.errorInput
        ]}
        placeholder="Password confirmation"
        secureTextEntry
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange('passwordConfirm')}
        onBlur={formik.handleBlur('passwordConfirm')}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={styles.errorText}>{formik.errors.passwordConfirm}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const formik = useFormik({
    initialValues,
    validationSchema: SignUpValidation,
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        const { data: signUpData } = await signUp({ username, password });
        if (signUpData) {
          console.log('Signed up successfully:', signUpData);
          const { data: signInData } = await signIn({ username, password });
          if (signInData) {
            console.log('Sign-in successful:', signInData);
            navigate('/');
          }
        }
      } catch (e) {
        console.error('Error signing up:', e);
      }
    },
  });

  return <SignUpContainer formik={formik} />;
};

export default SignUp;