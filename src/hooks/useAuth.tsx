import { useState, createContext, useContext } from "react";

interface AuthUser {
  id: string;
  fullName: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const signUp = async (email: string, password: string, fullName: string) => {
    // Frontend-only: simulate signup
    setUser({ id: crypto.randomUUID(), fullName, email });
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Frontend-only: simulate login
    setUser({ id: crypto.randomUUID(), fullName: email.split("@")[0], email });
    return { error: null };
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading: false, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
