import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-native";
import useReview from '../hooks/useReview';
import Text from './Text';
import * as yup from 'yup';

const ReviewValidation = yup.object().shape({
  username: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().min(0).max(100).required('Rating is required'),
  reviewDetails: yup.string().required('Review is required'),
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
  repositoryName: '',
  rating: '',
  reviewDetails: '',
};

export const ReviewContainer = ({ formik }) => {
  return (
    <View testID="reviewItem" style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username && formik.errors.username && styles.errorInput
        ]}
        placeholder="Repository owner name"
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
          formik.touched.repositoryName && formik.errors.repositoryName && styles.errorInput
        ]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating && styles.errorInput
        ]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.reviewDetails && formik.errors.reviewDetails && styles.errorInput
        ]}
        multiline
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange('reviewDetails')}
        onBlur={formik.handleBlur('reviewDetails')}
      />
      {formik.touched.reviewDetails && formik.errors.reviewDetails && (
        <Text style={styles.errorText}>{formik.errors.reviewDetails}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const Review = () => {
  const navigate = useNavigate();
  const [createReview] = useReview();

  const formik = useFormik({
    initialValues,
    validationSchema: ReviewValidation,
    onSubmit: async (values) => {
      const { username, repositoryName, rating, reviewDetails } = values;
      try {
        const { data } = await createReview({ username, repositoryName, rating, reviewDetails });
        console.log('Review added successfully:', data);
        const repositoryId = data.createReview.repositoryId;
        navigate(`/repository/${repositoryId}`)
      } catch (e) {
        console.error('Error adding review:', e);
      }
    },
  });

  return <ReviewContainer formik={formik} />;
};

export default Review;