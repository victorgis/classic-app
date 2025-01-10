import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContext = {
  session: Session | null;
  user: User | null;
  profile: any | null;
};

const AuthContext = createContext<AuthContext>({
  session: null,
  user: null,
  profile: null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);

  // Load session and profile from cache on startup
  useEffect(() => {
    const loadCachedSession = async () => {
      try {
        const cachedSession = await AsyncStorage.getItem("supabaseSession");
        if (cachedSession) {
          const parsedSession = JSON.parse(cachedSession);
          setSession(parsedSession);
        }

        const cachedProfile = await AsyncStorage.getItem("supabaseProfile");
        if (cachedProfile) {
          const parsedProfile = JSON.parse(cachedProfile);
          setProfile(parsedProfile);
        }
      } catch (error) {
        console.log("Error loading cached session or profile:", error);
      }
    };

    loadCachedSession();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        // Cache the session data
        AsyncStorage.setItem("supabaseSession", JSON.stringify(session));
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        // Cache the session data
        AsyncStorage.setItem("supabaseSession", JSON.stringify(session));
      } else {
        AsyncStorage.removeItem("supabaseSession"); // Clear session on logout
      }
    });
  }, []);

  useEffect(() => {
    if (!session?.user) {
      setProfile(null);
      return;
    }

    // Check if profile is cached
    const fetchProfile = async () => {
      try {
        let cachedProfile = await AsyncStorage.getItem("supabaseProfile");
        if (cachedProfile) {
          setProfile(JSON.parse(cachedProfile));
        } else {
          // If not cached, fetch from the database
          let { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          if (data) {
            setProfile(data);
            // Cache the profile data
            AsyncStorage.setItem("supabaseProfile", JSON.stringify(data));
          }
        }
      } catch (error) {
        console.log("Error fetching profile or loading from cache:", error);
      }
    };
    fetchProfile();
  }, [session?.user]);

  return (
    <AuthContext.Provider value={{ session, user: session?.user, profile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
