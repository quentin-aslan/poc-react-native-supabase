import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {Message as MessageType} from "../types/Message";


const Message = ({email, content, isCurrentUser}: MessageType & { isCurrentUser: boolean }) => {
    const containerStyle = isCurrentUser ? styles.containerRight : styles.containerLeft;
    const textStyle = isCurrentUser ? styles.textRight : styles.textLeft;
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.smallText}>{email}</Text>
            <Text style={textStyle}>{content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    containerLeft: {
        backgroundColor: '#EAEAEA',
        alignSelf: 'flex-start',
    },
    containerRight: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    smallText: {
        fontSize: 12,
        color: '#999',
    },
    textLeft: {
        textAlign: 'left',
    },
    textRight: {
        textAlign: 'right',
    },
});


export default Message;