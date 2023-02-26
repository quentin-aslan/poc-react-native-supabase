import {Alert, FlatList, SafeAreaView, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import Message from "./Message";
import { Message as MessageType} from "../types/Message";
import ChatInput from "./ChatInput";
import supabase from "../lib/initSupabase";

const ChatScreen = () => {

    const fetchMessages = async () => {
        const { data, error } = await supabase.from('messages').select();
        if(error) return Alert.alert("Error", "Something went wrong");
        setMessages(data);
    }

    const listenForMessages = async () => {
        supabase
            .channel('table-db-changes')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                },
                (payload) => {
                    if(payload.new) setMessages((messages) => [...messages, payload.new] as MessageType[]);
                }
            )
            .subscribe()
    }

    // This function is called once the component is mounted
    useEffect(() => {
        fetchMessages().then();
        listenForMessages().then();
    }, [])

    const [messages, setMessages] = useState<MessageType[]>([]);

    return (
        <SafeAreaView style={styles.container}>
            <ChatInput />
            <FlatList
                data={messages}
                renderItem={({item}) => Message({username: 'Username', content: item.content})}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default ChatScreen;