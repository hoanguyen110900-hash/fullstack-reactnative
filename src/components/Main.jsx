import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Route, Routes, Navigate } from "react-router-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import SingleRepository from "./SingleRepository";
import CreateReview from "./CreateReview";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
  heading: {
    fontSize: theme.fontSizes.title,
    fontWeight: theme.fontWeights.bold,
    margin: theme.spacing.medium,
  },
});

const Main = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Rate Repository Application</Text>
      <AppBar />

      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repositories/:id" element={<SingleRepository />} />
        <Route path="/createreview" element={<CreateReview />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SafeAreaView>
  );
};
export default Main;
