import { useState, createContext, useContext, useEffect } from "react";
import { authApi } from "@/lib/api";

const TOKEN_KEY = "token";

interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const me = await authApi.getMe();
      setUser({
        id: me.id,
        fullName: me.fullName,
        email: me.email,
        isAdmin: me.isAdmin ?? false,
      });
    } catch {
      localStorage.removeItem(TOKEN_KEY);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      await authApi.register(email, password, fullName);
      const login = await authApi.login(email, password);
      localStorage.setItem(TOKEN_KEY, login.token);
      setUser({
        id: "",
        fullName: login.fullName,
        email: login.email,
        isAdmin: login.isAdmin ?? false,
      });
      await loadUser();
      return { error: null };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Registration failed";
      return { error: msg };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await authApi.login(email, password);
      localStorage.setItem(TOKEN_KEY, res.token);
      setUser({
        id: "",
        fullName: res.fullName,
        email: res.email,
        isAdmin: res.isAdmin ?? false,
      });
      await loadUser();
      return { error: null };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid email or password";
      return { error: msg };
    }
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
