import {FlatList, SafeAreaView, StyleSheet} from "react-native";
import {useState} from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";
import supabase from "../lib/initSupabase";

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);

    const getMessages = async (): Promise<any> => {
        try {
            const { data, error } =  await supabase.from("messages").select("*");
            setMessages(data)
        } catch (e) {

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ChatInput />
            <FlatList
                data={messages}
                renderItem={({item}) => Message(item)}
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