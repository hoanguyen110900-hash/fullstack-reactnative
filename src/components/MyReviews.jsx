import { Alert, FlatList, View, StyleSheet, Platform } from "react-native";
import { Button, Text } from "react-native-paper";
import { useQuery, useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-native";
import { ME, DELETE_REVIEW } from "../graphql/queries";
import ReviewItem from "./ReviewItem";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.spacing.medium,
    paddingBottom: theme.spacing.medium,
  },
  reviewContainer: {
    marginHorizontal: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    backgroundColor: theme.colors.repositoryBackground,
    borderRadius: 8,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    gap: theme.spacing.medium,
    padding: theme.spacing.medium,
  },
  button: {
    flex: 1,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 24,
    backgroundColor: theme.colors.inputBackground,
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  buttonTextDelete: {
    color: theme.colors.repositoryBackground,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  buttonDelete: {
    flex: 1,
    borderWidth: 2,
    borderColor: theme.colors.error,
    borderRadius: 24,
    backgroundColor: theme.colors.error,
  },
});

const MyReviews = () => {
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  const [deleteReview, deleteResult] = useMutation(DELETE_REVIEW);

  const reviews = data?.me?.reviews?.edges?.map((edge) => edge.node) ?? [];

  const handleDelete = (reviewId) => {
    const confirmDelete = async () => {
      try {
        await deleteReview({
          variables: { deleteReviewId: reviewId },
        });

        await refetch();
      } catch (e) {
        console.error("Failed to delete review:", e);
        Alert.alert("Error", "Could not delete the review.");
      }
    };

    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to delete this review?")) {
        confirmDelete();
      }
      return;
    }

    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: confirmDelete,
        },
      ],
      { cancelable: true },
    );
  };

  if (loading && !data) {
    return <Text>Loading reviews...</Text>;
  }

  if (error) {
    return <Text>Could not load your reviews.</Text>;
  }

  if (reviews.length === 0) {
    return <Text>You have not written any reviews yet.</Text>;
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.reviewContainer}>
          <ReviewItem review={item} username={data.me.username} />

          <View style={styles.actions}>
            <Button
              mode="outlined"
              style={styles.button}
              labelStyle={styles.buttonText}
              onPress={() => navigate(`/repositories/${item.repository.id}`)}
            >
              View repository
            </Button>

            <Button
              mode="contained"
              style={styles.buttonDelete}
              labelStyle={styles.buttonTextDelete}
              loading={deleteResult.loading}
              disabled={deleteResult.loading}
              onPress={() => handleDelete(item.id)}
            >
              Delete
            </Button>
          </View>
        </View>
      )}
    />
  );
};

export default MyReviews;
