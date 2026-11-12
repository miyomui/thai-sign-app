import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { isSupabaseReady, supabase } from '@/lib/supabaseClient';

const AuthContext = createContext(null);

// ผู้ใช้จำลอง ใช้เมื่อยังไม่ได้ตั้งค่า Supabase
const MOCK_USER = { id: 'mock-user', name: 'กานต์' };

function toUser(sbUser) {
  if (!sbUser) return null;
  const meta = sbUser.user_metadata ?? {};
  return { id: sbUser.id, name: meta.full_name ?? meta.name ?? sbUser.email ?? 'ผู้ใช้' };
}

/** ครอบแอปไว้ใน app/providers.jsx */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(isSupabaseReady ? null : MOCK_USER);

  useEffect(() => {
    if (!isSupabaseReady) return undefined;
    supabase.auth.getSession().then(({ data }) => setUser(toUser(data.session?.user)));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setUser(toUser(session?.user)));
    return () => data.subscription.unsubscribe();
  }, []);

  const login = useCallback(async () => {
    if (!isSupabaseReady) return setUser(MOCK_USER);
    // Google OAuth ใช้ได้ฟรีบน Supabase free tier (ต้องเปิดใน Authentication → Providers)
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
  }, []);

  const logout = useCallback(async () => {
    if (!isSupabaseReady) return setUser(null);
    await supabase.auth.signOut();
  }, []);

  const value = useMemo(() => ({ user, loggedIn: Boolean(user), login, logout }), [user, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** const { user, loggedIn, login, logout } = useAuth(); */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth ต้องอยู่ภายใน <AuthProvider>');
  return ctx;
}
