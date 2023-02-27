import {SafeAreaView, StyleSheet, Alert, TextInput, View, TouchableOpacity, Text} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from "../lib/initSupabase";
import Toast from "react-native-toast-message";

const LoginScreen = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) {
            Toast.show({
                type: 'error',
                text1: error.message
            });
        }
        else {
            storeCredentials()
            Toast.show({
                type: 'success',
                text1: `Welcome back ${email}`
            });
        }

        setLoading(false)

    }
    const signUp = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            Toast.show({
                type: 'error',
                text1: error.message
            });
        }
        else {
            storeCredentials()
            Toast.show({
                type: 'success',
                text1: `Welcome ${email}`
            });
        }
        setLoading(false)
    }
    const isValidEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    const handleLogin = (method: string) => {
        if(!isValidEmail(email)) {
            return Alert.alert("Invalid email", "Please try again");
        }

        if(password.length < 6) {
            return Alert.alert("Password must be at least 6 characters long", "Please try again");
        }

        if(method === "signUp") signUp();
        else signIn()
    }

    const storeCredentials = async () => {
        await AsyncStorage.setItem("credentials", JSON.stringify({email, password}));
    }
    const getCredentialsFromStorage = async () => {
        const credentials = await AsyncStorage.getItem("credentials");
        if(credentials) {
            const {email, password} = JSON.parse(credentials);
            setEmail(email);
            setPassword(password);
        }
    }

    useEffect(() => {
        getCredentialsFromStorage();
    }, []);

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder={"your@email.com"} value={email} onChangeText={setEmail} autoCapitalize={'none'}  />
            <TextInput secureTextEntry={true} style={styles.input} placeholder={"Password"}  value={password} onChangeText={setPassword} />
            <View style={{flexDirection: "row", justifyContent: "space-between", width: "80%"}}>
                <TouchableOpacity disabled={loading} style={(loading) ? styles.disabledButton : styles.button} onPress={() => handleLogin('signIn')}>
                    <Text style={styles.buttonTextStyle}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={loading} style={(loading) ? styles.disabledButton : styles.button} onPress={() => handleLogin('signUp')}>
                    <Text style={styles.buttonTextStyle}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '80%',
        justifyContent: "center",
    },
    inputContainer: {
        flex: 1,
        alignItems: "center",
    },
    input: {
        height: 40,
        width: "80%",
        margin: 12,
        fontSize: 20,
        textAlign: "center"
    },
    button: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2196F3",
    },
    disabledButton: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#82828e",
    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: 22
    }
});

export default LoginScreen;