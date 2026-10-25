import { ApolloProvider } from "@apollo/client/react";
import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  console.log("env check:", process.env.EXPO_PUBLIC_ENV);
  return (
    <>
      <SafeAreaProvider>
        <PaperProvider>
          <StatusBar style="light" />
          <NativeRouter>
            <ApolloProvider client={apolloClient}>
              <AuthStorageContext.Provider value={authStorage}>
                <Main />
              </AuthStorageContext.Provider>
            </ApolloProvider>
          </NativeRouter>
        </PaperProvider>
      </SafeAreaProvider>
    </>
  );
};

export default App;
