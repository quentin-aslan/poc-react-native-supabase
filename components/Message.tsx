import React from "react";
import {StyleSheet, View, Text} from "react-native";

type Props = {
    username: string,
    content: string;
};


const Message = ({username, content}: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.message}>{content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 10,
        margin: 10,
    },
    username: {
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 10,
    },
    message: {
        fontSize: 18,
    }
})

export default Message;