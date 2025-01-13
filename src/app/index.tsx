import { Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";

export default function HomeScreen() {
    const {user } = useAuth()
    if (!user) return <Redirect href="/(auth)/signup" />;
}