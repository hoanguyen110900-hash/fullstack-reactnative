import { View, StyleSheet } from "react-native";
import { format } from "date-fns";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.repositoryBackground,
    padding: theme.spacing.medium,
    marginHorizontal: theme.spacing.medium,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  details: {
    flex: 1,
    gap: 4,
  },
  reviewText: {
    marginTop: 12,
  },
});

const ReviewItem = ({ review, username }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.rating}>
          <Text color="primary" fontWeight="bold">
            {review.rating}
          </Text>
        </View>

        <View style={styles.details}>
          <Text fontWeight="bold">
            {username ?? review.user?.username ?? "Unknown user"}
          </Text>

          <Text color="textSecondary">
            {format(new Date(review.createdAt), "dd MMM yyyy")}
          </Text>
        </View>
      </View>

      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  );
};

export default ReviewItem;
