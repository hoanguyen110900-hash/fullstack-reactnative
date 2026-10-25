import { useParams } from "react-router-native";
import { View, FlatList, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";
import useRepository from "../hooks/useRepository";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();

  const { repository, reviews, loading, error, fetchMore, hasNextPage } =
    useRepository(id);

  if (loading && !repository) {
    return <View />;
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (!repository) {
    return null;
  }

  const onEndReach = () => {
    if (!loading && hasNextPage) {
      fetchMore();
    }
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <View style={{ marginBottom: 12 }}>
          <RepositoryItem item={repository} showGitHubButton />
        </View>
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
