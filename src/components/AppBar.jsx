import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigate } from "react-router-native";
import { useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";
import useSignOut from "../hooks/useSignOut";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: theme.colors.appBarTabBackground,
  },
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const signOut = useSignOut();
  const navigate = useNavigate();
  const isSignedIn = !!data?.me;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AppBarTab title="Repositories" destination="/" />
        {isSignedIn && (
          <>
            <AppBarTab
              title="Create a review"
              onPress={() => navigate("/createreview")}
            />
            <AppBarTab title="My reviews" destination="/reviews" />
          </>
        )}
        {isSignedIn ? (
          <AppBarTab title="Sign out" onPress={signOut} />
        ) : (
          <>
            <AppBarTab title="Sign in" destination="/signin" />
            <AppBarTab title="Sign up" destination="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
