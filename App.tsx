import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "./components/LoginScreen";
import ChatScreen from "./components/ChatScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name={"Login"} component={LoginScreen} />
              <Stack.Screen options={{ headerBackVisible: false }} name={"Chat"} component={ChatScreen} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}