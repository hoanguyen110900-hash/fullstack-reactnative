import { View, StyleSheet, Image, Pressable, Linking } from "react-native";
import Text from "./Text";
import RepositoryStats from "./RepositoryStats";
import theme from "../theme";

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.repositoryBackground,
    padding: theme.spacing.medium,
    marginHorizontal: theme.spacing.medium,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    gap: theme.spacing.medium,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 6,
  },
  details: {
    flex: 1,
    gap: theme.spacing.small,
  },
  fullName: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  languageBadge: {
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },
  language: {
    color: "#ffffff",
    fontWeight: theme.fontWeights.bold,
  },
  description: {
    color: theme.colors.textSecondary,
  },
  label: {
    fontWeight: theme.fontWeights.bold,
  },
  githubButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    alignItems: "center",
    borderRadius: 4,
    marginTop: 12,
  },
  githubText: {
    color: "#ffffff",
    fontWeight: theme.fontWeights.bold,
  },
});

const RepositoryItem = ({ item, testID, showGitHubButton = false }) => {
  return (
    <View testID={testID}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />

          <View style={styles.details}>
            <Text style={styles.fullName}>{item.fullName}</Text>

            <View style={styles.languageBadge}>
              <Text style={styles.language}>{item.language}</Text>
            </View>

            <Text style={styles.description}>
              <Text style={styles.label}>Description: </Text>
              {item.description}
            </Text>

            {showGitHubButton && (
              <Pressable
                onPress={() => Linking.openURL(item.url)}
                style={styles.githubButton}
              >
                <Text style={styles.githubText}>Open in GitHub</Text>
              </Pressable>
            )}
          </View>
        </View>

        <RepositoryStats repository={item} />
      </View>
    </View>
  );
};

export default RepositoryItem;
