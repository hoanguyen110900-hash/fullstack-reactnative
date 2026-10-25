import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Menu, Button, TextInput } from "react-native-paper";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    gap: theme.spacing.small,
  },
  searchInput: {
    borderWidth: 2,
    borderColor: theme.colors.borderColor,
    borderRadius: 24,
    backgroundColor: theme.colors.inputBackground,
    fontSize: theme.fontSizes.subheading,
  },
  button: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 24,
    backgroundColor: theme.colors.inputBackground,
  },
  sortButtonContent: {
    flexDirection: "row-reverse",
  },
});

const orderOptions = [
  {
    label: "Latest repositories",
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  },
  {
    label: "Highest rated repositories",
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  {
    label: "Lowest rated repositories",
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  header,
  loading,
  onEndReach,
  onRepositoryPress,
}) => {
  const repositoryNodes = repositories || [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => (
        <Pressable onPress={() => onRepositoryPress?.(item.id)}>
          <RepositoryItem item={item} testID="repositoryItem" />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={header}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      refreshing={loading ?? false}
    />
  );
};

const RepositoryListHeader = ({
  searchKeyword,
  setSearchKeyword,
  menuVisible,
  setMenuVisible,
  selectedOrder,
  onSelectOrder,
}) => (
  <View style={styles.header}>
    <TextInput
      mode="outlined"
      style={styles.searchInput}
      outlineStyle={{
        borderWidth: 2,
        borderColor: theme.colors.borderColor,
        borderRadius: 24,
      }}
      placeholder="Search repositories..."
      placeholderTextColor="#9CA3AF"
      textColor="#000000"
      value={searchKeyword}
      onChangeText={setSearchKeyword}
      autoCapitalize="none"
      autoCorrect={false}
    />

    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <Button
          style={styles.button}
          textColor={theme.colors.primary}
          contentStyle={styles.sortButtonContent}
          onPress={() => setMenuVisible(true)}
        >
          {selectedOrder.label}
        </Button>
      }
    >
      {orderOptions.map((option) => (
        <Menu.Item
          key={option.label}
          title={option.label}
          onPress={() => onSelectOrder(option)}
        />
      ))}
    </Menu>
  </View>
);

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState(orderOptions[0]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();

  const { repositories, loading, error, fetchMore, hasNextPage } =
    useRepositories({
      orderBy: selectedOrder.orderBy,
      orderDirection: selectedOrder.orderDirection,
      searchKeyword: debouncedSearchKeyword,
    });
  if (error) {
    return <Text>{error.message}</Text>;
  }

  const onSelectOrder = (option) => {
    setSelectedOrder(option);
    setMenuVisible(false);
  };

  const onEndReach = () => {
    if (!loading && hasNextPage) {
      fetchMore();
    }
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onRepositoryPress={(id) => navigate(`/repositories/${id}`)}
      header={
        <RepositoryListHeader
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          menuVisible={menuVisible}
          setMenuVisible={setMenuVisible}
          selectedOrder={selectedOrder}
          onSelectOrder={onSelectOrder}
        />
      }
      loading={loading}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
