import {SafeAreaView, StyleSheet, Alert, TextInput, View, TouchableOpacity, Text} from "react-native";
import {useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp} from "@react-navigation/native";

const LoginScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
    const usernameAlreadyExists = async () => {
        const username = await AsyncStorage.getItem("@username");
        if(username) {
            navigation.navigate("Chat", {username});
        }
    }

    usernameAlreadyExists();

    const [username, setUsername] = useState("");

    const handleLogin = async () => {
        if(username.length < 4) {
            return Alert.alert("Username must be at least 3 characters long", "Please try again");
        }



        await AsyncStorage.setItem("@username", username);
        navigation.navigate("Chat", {username});
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder={"Username"} onChangeText={setUsername} onSubmitEditing={handleLogin}  />
            <TouchableOpacity style={styles.button}  onPress={handleLogin}>
                <Text style={{color: '#fff', fontSize: 22}}>Go to chat</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        height: 40,
        width: "80%",
        margin: 12,
        padding: 10,
        fontSize: 28,
        textAlign: "center"
    },
    button: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2196F3",
    }
});

export default LoginScreen;