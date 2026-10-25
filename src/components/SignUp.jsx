import { useMutation } from "@apollo/client/react";
import { Formik } from "formik";
import * as yup from "yup";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";

import { CREATE_USER } from "../graphql/queries";
import useSignIn from "../hooks/useSignIn";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.repositoryBackground,
  },
  title: {
    fontSize: theme.fontSizes.titlePlus,
    fontWeight: theme.fontWeights.bold,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: theme.fontSizes.body,
    color: "#6B7280",
    marginBottom: 8,
  },
  label: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.smallPlus,
    paddingVertical: theme.spacing.smallPlus,
    fontSize: theme.fontSizes.subheading,
    backgroundColor: theme.colors.inputBackground,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: theme.colors.repositoryBackground,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  inputError: {
    borderColor: theme.colors.error,
    borderWidth: 1.5,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be at most 30 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must be at most 50 characters"),

  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const SignUp = () => {
  const [createUser, { loading }] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await createUser({
        variables: {
          user: {
            username: values.username.trim(),
            password: values.password,
          },
        },
      });

      await signIn({
        username: values.username.trim(),
        password: values.password,
      });

      navigate("/");
    } catch (e) {
      console.error("Sign-up failed:", e.message);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        passwordConfirmation: "",
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
          <Text style={styles.title}>Sign up</Text>

          <View>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#9CA3AF"
              value={values.username}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              autoCapitalize="none"
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
          </View>

          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <View>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor="#9CA3AF"
              value={values.passwordConfirmation}
              onChangeText={handleChange("passwordConfirmation")}
              onBlur={handleBlur("passwordConfirmation")}
              secureTextEntry
            />
            {touched.passwordConfirmation && errors.passwordConfirmation && (
              <Text style={styles.error}>{errors.passwordConfirmation}</Text>
            )}
          </View>

          <Pressable
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Creating account..." : "Sign up"}
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
