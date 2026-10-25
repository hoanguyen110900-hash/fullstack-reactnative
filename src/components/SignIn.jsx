import * as yup from "yup";
import { useState, useEffect } from "react";
import { StyleSheet, TextInput, Pressable, View } from "react-native";
import { useFormik } from "formik";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: theme.spacing.large,
  },
  card: {
    backgroundColor: theme.colors.repositoryBackground,
    padding: theme.spacing.large,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    gap: theme.spacing.meidum,
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
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

export const SignInForm = ({ onSubmit }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to rate and explore repositories.
          </Text>
        </View>

        <View>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[
              styles.input,
              formik.touched.username &&
                formik.errors.username &&
                styles.inputError,
            ]}
            placeholder="Enter your username"
            placeholderTextColor="#9CA3AF"
            value={formik.values.username}
            onChangeText={formik.handleChange("username")}
            autoCapitalize="none"
            autoCorrect={false}
            onBlur={formik.handleBlur("username")}
          />
          {formik.touched.username && formik.errors.username && (
            <Text style={styles.errorText}>{formik.errors.username}</Text>
          )}
        </View>

        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[
              styles.input,
              formik.touched.password &&
                formik.errors.password &&
                styles.inputError,
            ]}
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
            onBlur={formik.handleBlur("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={styles.errorText}>{formik.errors.password}</Text>
          )}
          <Pressable
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={{ alignSelf: "flex-end", marginTop: 8 }}
          >
            <Text style={{ color: theme.colors.primary }}>
              {passwordVisible ? "Hide password" : "Show password"}
            </Text>
          </Pressable>
        </View>

        <Pressable style={styles.button} onPress={formik.handleSubmit}>
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignIn = () => {
  const [signIn, result] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await signIn(values);
    navigate("/");
  };

  useEffect(() => {
    if (result.data) {
      console.log(result.data);
    }
  }, [result.data]);

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
