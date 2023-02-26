import { useState } from "react";
import {TextInput, Alert, StyleSheet, View, TouchableOpacity, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import supabase from "../lib/initSupabase";

const ChatInput = () => {
    const [message, setMessage] = useState("");

    const sendMessage = async () => {
        if (message.length < 4) {
            return Alert.alert("Message must be at least 4 character long", "Please try again");
        }

        const username = await AsyncStorage.getItem("@username");
        const { error } = await supabase.from('messages').insert({content: message});
        if(error) return Alert.alert("Error", "Something went wrong");

        setMessage("");
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder={"Type a message"}
                value={message}
                onChangeText={setMessage}
                onSubmitEditing={sendMessage}
            />
            <TouchableOpacity style={styles.button} onPress={sendMessage}>
                <Text style={{color: '#fff'}}>Send</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        margin: 10,
    },
    input: {
        height: 40,
        width: "80%",
        padding: 10,
        fontSize: 18,
        backgroundColor: "#ccc",
    },
    button: {
        fontSize: 18,
        backgroundColor: "#2196F3",
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
    }
})

export default ChatInput;