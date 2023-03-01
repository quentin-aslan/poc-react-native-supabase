import { useState } from "react";
import {TextInput, Alert, StyleSheet, View, TouchableOpacity, Text} from "react-native";
import supabase from "../lib/initSupabase";
import {Session} from "@supabase/supabase-js";

const ChatInput = ({session}: {session: Session}) => {
    const [message, setMessage] = useState("");

    const sendMessage = async () => {
        if (message.length < 1) {
            return Alert.alert("Message must be at least 1 character long", "Please try again");
        }

        const { error } = await supabase.from('messages').insert({content: message, email: session.user.email as string});
        if(error) return Alert.alert("Error", "Something went wrong");
        setMessage("");
    }

    return (
    <View style={styles.inputContainer}>
        <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message"
            onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        marginRight: 16,
        marginLeft: 16,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 4,
        padding: 8,
        marginRight: 8,
    },
    sendButton: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: "#1DB954",
    },
    sendButtonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
})

export default ChatInput;