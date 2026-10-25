import { Pressable, View, Text, StyleSheet } from "react-native";
import { Link, useLocation } from "react-router-native";
import theme from "../theme";

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
    backgroundColor: theme.colors.appBarTabBackground,
  },
  activeTab: {
    borderBottomColor: theme.colors.primary,
  },
  activeText: {
    color: theme.colors.textAppBarTab,
    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
  },
  text: {
    color: theme.colors.textAppBarTab,
    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
});

const AppBarTab = ({ title, destination, onPress }) => {
  const { pathname } = useLocation();
  const isActive = pathname === destination;

  const content = (
    <View style={[styles.tab, isActive && styles.activeTab]}>
      <Text style={[styles.text, isActive && styles.activeText]}>{title}</Text>
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return <Link to={destination}>{content}</Link>;
};

export default AppBarTab;
