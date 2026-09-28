import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        if (!supabase?.auth?.getSession) {
          if (mounted) setLoading(false);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          setUser(session?.user ?? null);
          setRole(session?.user?.user_metadata?.role ?? "officer");
        }
      } catch (err) {
        console.warn("Auth initialization error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initAuth();

    let subscription = null;
    try {
      const authListener = supabase?.auth?.onAuthStateChange((_event, session) => {
        if (mounted) {
          setUser(session?.user ?? null);
          setRole(session?.user?.user_metadata?.role ?? "officer");
          setLoading(false);
        }
      });
      subscription = authListener?.data?.subscription;
    } catch (err) {
      console.warn("Auth listener error:", err);
      if (mounted) setLoading(false);
    }

    return () => {
      mounted = false;
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const value = {
    user,
    role,
    loading,
    signOut: () => supabase.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};