import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {Message as MessageType} from "../types/Message";


const Message = ({email, content}: MessageType) => {
    return (
        <View style={styles.container}>
            <Text style={styles.email}>{email} : </Text>
            <Text style={styles.message}>{content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: 10,
        margin: 10,
    },
    email: {
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 10,
    },
    message: {
        fontSize: 18,
    }
})

export default Message;