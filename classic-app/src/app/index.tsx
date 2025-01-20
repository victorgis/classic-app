import { Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";

export default function RedirectPage() {
  const { user } = useAuth();
  if (!user) return <Redirect href="/login" />;
}
