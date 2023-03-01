import LoginScreen from "./components/LoginScreen";
import ChatScreen from "./components/ChatScreen";
import {useState, useEffect} from "react";
import { Session } from '@supabase/supabase-js'
import supabase from "./lib/initSupabase";
import {View} from "react-native";
import Toast from "react-native-toast-message";

export default function App() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            if(session?.user) {
                Toast.show({
                    type: 'success',
                    text1: `Welcome back ${session?.user.email}`
                });
            }
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
  return (
      <View style={{flex:1}}>
          {session && session.user ? <ChatScreen session={session} /> : <LoginScreen />}
          <Toast />
      </View>
  );
}