import { useMutation } from "@apollo/client/react";
import { Formik } from "formik";
import * as yup from "yup";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { CREATE_REVIEW } from "../graphql/queries";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
    gap: theme.spacing.small,
  },
  heading: {
    fontSize: theme.fontSizes.title,
    fontWeight: theme.fontWeights.bold,
    marginBottom: theme.spacing.small,
  },
  input: {
    backgroundColor: theme.colors.repositoryBackground,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    borderRadius: 8,
    padding: theme.spacing.smallPlus,
    fontSize: theme.spacing.medium,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  error: {
    color: theme.colors.error,
    marginBottom: 4,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: theme.spacing.small,
  },
  buttonText: {
    color: theme.colors.repositoryBackground,
    fontWeight: theme.fontWeights.bold,
  },
  label: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    marginBottom: 6,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's username is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .integer("Rating must be a whole number")
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100"),
  text: yup.string(),
});

const CreateReview = () => {
  const navigate = useNavigate();

  const [createReview, { loading, error }] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values, { resetForm }) => {
    try {
      const result = await createReview({
        variables: {
          review: {
            ownerName: values.ownerName.trim(),
            repositoryName: values.repositoryName.trim(),
            rating: Number(values.rating),
            text: values.text.trim() || null,
          },
        },
      });

      const repositoryId = result.data?.createReview?.repositoryId;

      if (repositoryId) {
        resetForm();
        navigate(`/repositories/${repositoryId}`);
      }
    } catch (e) {
      console.error("Failed to create review:", e.message);
    }
  };

  return (
    <Formik
      initialValues={{
        ownerName: "",
        repositoryName: "",
        rating: "",
        text: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text style={styles.heading}>Create a review</Text>

          <View>
            <Text style={styles.label}>Repository Owner</Text>
            <TextInput
              style={styles.input}
              placeholder="Repository owner's username"
              placeholderTextColor="#9CA3AF"
              value={values.ownerName}
              onChangeText={handleChange("ownerName")}
              onBlur={handleBlur("ownerName")}
              autoCapitalize="none"
            />
            {touched.ownerName && errors.ownerName && (
              <Text style={styles.error}>{errors.ownerName}</Text>
            )}
          </View>

          <View>
            <Text style={styles.label}>Repository Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Repository name"
              placeholderTextColor="#9CA3AF"
              value={values.repositoryName}
              onChangeText={handleChange("repositoryName")}
              onBlur={handleBlur("repositoryName")}
              autoCapitalize="none"
            />
            {touched.repositoryName && errors.repositoryName && (
              <Text style={styles.error}>{errors.repositoryName}</Text>
            )}
          </View>

          <View>
            <Text style={styles.label}>Rating</Text>
            <TextInput
              style={styles.input}
              placeholder="Rating (0–100)"
              placeholderTextColor="#9CA3AF"
              value={values.rating}
              onChangeText={handleChange("rating")}
              onBlur={handleBlur("rating")}
              keyboardType="numeric"
            />
            {touched.rating && errors.rating && (
              <Text style={styles.error}>{errors.rating}</Text>
            )}
          </View>

          <View>
            <Text style={styles.label}>Review</Text>
            <TextInput
              style={[styles.input, styles.multiline]}
              placeholder="Review (optional)"
              placeholderTextColor="#9CA3AF"
              value={values.text}
              onChangeText={handleChange("text")}
              onBlur={handleBlur("text")}
              multiline
            />
          </View>

          {error && <Text style={styles.error}>{error.message}</Text>}

          <Pressable
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Submitting..." : "Create review"}
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default CreateReview;
