import {FlatList, SafeAreaView, StyleSheet} from "react-native";
import { messagesMock } from "../mock/mocks";
import Message from "./Message";
import ChatInput from "./ChatInput";

const ChatScreen = () => {
    const getMessages = () => {
        // TODO: Fetch messages from API
        return messagesMock;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ChatInput />
            <FlatList
                data={getMessages()}
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