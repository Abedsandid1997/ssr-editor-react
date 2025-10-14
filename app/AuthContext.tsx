// app/AuthContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import apiClient from "./services/api-client";

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (val: boolean) => void;
  userId: string;
  setUserId: (val: string) => void;
  userName: string;
  setUserName: (val: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    apiClient
      .get("/api/auth/me")
      .then((res) => {
        setAuthenticated(true);
        setUserId(res.data._id);
        setUserName(res.data.name);
      })
      .catch(() => setAuthenticated(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        userId,
        setUserId,
        userName,
        setUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
