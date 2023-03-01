import {Alert, FlatList, SafeAreaView, StyleSheet} from "react-native";
import React, {useEffect, useState, useRef} from "react";
import Message from "./Message";
import { Message as MessageType} from "../types/Message";
import ChatInput from "./ChatInput";
import supabase from "../lib/initSupabase";
import { Session } from '@supabase/supabase-js'

const ChatScreen = ({session}: {session: Session}) => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const flatListRef = useRef<FlatList<MessageType>>(null);

    // This function is called once the component is mounted
    useEffect(() => {
        fetchMessages().then();
        listenForMessages().then();
    }, [])

    const fetchMessages = async () => {
        const { data, error } = await supabase.from('messages').select(`content, email`);
        if(error) return Alert.alert("Error", "Something went wrong");
        setMessages(data);
    }

    const listenForMessages = async () => {
        supabase.channel('table-db-changes')
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

    const scrollToBottom = () => {
        if(messages.length > 0) flatListRef.current?.scrollToEnd({ animated: true });
    };


    return (
        <SafeAreaView style={style.container}>
            <FlatList
                ref={flatListRef}
                onContentSizeChange={scrollToBottom}
                style={{ flex: 1 }}
                data={messages}
                renderItem={({item}) => Message({email: item.email, content: item.content, isCurrentUser: item.email === session.user.email})}
            />
            <ChatInput session={session} />
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF",
        padding: 16,
    }
})

export default ChatScreen;