import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xqcfakcvarfbtfngawsd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxY2Zha2N2YXJmYnRmbmdhd3NkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTg5OTM4NCwiZXhwIjoyMDUxNDc1Mzg0fQ.OH4IWaw6Cw1FJOOCs0l24XKuzpNlqG1AqQ0kHyExnng";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
