import { Provider } from "react-redux";
import {mystore} from "./redux/store";
import AppNavigator from "./navigation/index";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={mystore}>
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
