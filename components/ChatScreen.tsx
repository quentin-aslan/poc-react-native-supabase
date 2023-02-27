import {Alert, FlatList, SafeAreaView} from "react-native";
import React, {useEffect, useState} from "react";
import Message from "./Message";
import { Message as MessageType} from "../types/Message";
import ChatInput from "./ChatInput";
import supabase from "../lib/initSupabase";
import { Session } from '@supabase/supabase-js'
import Toast from 'react-native-toast-message';

const ChatScreen = ({session}: {session: Session}) => {
    // This function is called once the component is mounted
    useEffect(() => {
        fetchMessages().then();
        listenForMessages().then();
    }, [])

    const fetchMessages = async () => {
        const { data, error } = await supabase.from('messages').select();
        if(error) return Alert.alert("Error", "Something went wrong");
        setMessages(data);

        Toast.show({
            type: 'success',
            text1: 'All messages fetched',
        });
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

    const [messages, setMessages] = useState<MessageType[]>([]);

    return (
        <SafeAreaView>
            <ChatInput />
            <FlatList
                data={messages}
                renderItem={({item}) => Message({username: session.user.email ?? 'Username', content: item.content})}
            />
        </SafeAreaView>
    );
}
export default ChatScreen;