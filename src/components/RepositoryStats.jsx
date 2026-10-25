import { View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: theme.colors.mainBackground,
    paddingTop: theme.spacing.medium,
    marginTop: theme.spacing.medium,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    color: theme.colors.textSecondary,
  },
  value: {
    fontWeight: theme.fontWeights.bold,
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }

  return String(count);
};

const Stat = ({ label, value }) => (
  <View style={styles.stat}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const RepositoryStats = ({ repository }) => (
  <View style={styles.container}>
    <Stat label="Forks" value={formatCount(repository.forksCount)} />
    <Stat label="Stars" value={formatCount(repository.stargazersCount)} />
    <Stat label="Rating" value={repository.ratingAverage} />
    <Stat label="Reviews" value={repository.reviewCount} />
  </View>
);

export default RepositoryStats;
