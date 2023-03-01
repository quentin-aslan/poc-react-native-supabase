import {SafeAreaView, StyleSheet, Alert, TextInput, TouchableOpacity, Text} from "react-native";
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
        <Text style={styles.title}>Login</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleLogin('signIn')} disabled={loading}>
            <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleLogin('signUp')} disabled={loading}>
            <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f6f8fa',
    },
    title: {
        fontSize: 24,
        marginBottom: 32,
        color: '#24292e',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5da',
        borderRadius: 4,
        padding: 8,
        marginVertical: 8,
        width: '80%',
        backgroundColor: '#fff',
        color: '#24292e',
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#1DB954',
        borderRadius: 4,
        padding: 12,
        marginVertical: 16,
        width: '80%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default LoginScreen;