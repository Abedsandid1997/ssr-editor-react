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
import { jwtDecode } from "jwt-decode";
interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (val: boolean) => void;
  userId: string;
  setUserId: (val: string) => void;
  userName: string;
  setUserName: (val: string) => void;
  token: string | null;
  setToken: (val: string | null) => void;
}
interface JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    apiClient
      .get("/auth")
      .then((res) => {
        const receivedToken = res.data.token;
        if (!receivedToken) throw new Error("No token received");

        setToken(receivedToken);
        setAuthenticated(true);

        const decoded: JwtPayload = jwtDecode(receivedToken);
        setUserId(decoded.id);

        setUserName(decoded.email || "");
      })
      .catch(() => {
        setAuthenticated(false);
        setToken(null);
        setUserId("");
        setUserName("");
      });
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
        token,
        setToken,
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
// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// interface JwtPayload {
//   id: string;
//   email: string;
//   iat: number;
//   exp: number;
// }

// interface AuthContextType {
//   isAuthenticated: boolean;
//   setAuthenticated: (val: boolean) => void;
//   userId: string;
//   setUserId: (val: string) => void;
//   userName: string;
//   setUserName: (val: string) => void;
//   token: string | null;
//   setToken: (val: string | null) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setAuthenticated] = useState(false);
//   const [userId, setUserId] = useState("");
//   const [userName, setUserName] = useState("");
//   const [token, setToken] = useState<string | null>(null);

// useEffect(() => {
//   axios
//     .get("/api/auth")
//     .then((res) => {
//       const receivedToken = res.data.token;
//       if (!receivedToken) throw new Error("No token received");

//       setToken(receivedToken);
//       setAuthenticated(true);

//       const decoded: JwtPayload = jwtDecode(receivedToken);
//       setUserId(decoded.id);

//       setUserName(decoded.email || "");
//     })
//     .catch(() => {
//       setAuthenticated(false);
//       setToken(null);
//       setUserId("");
//       setUserName("");
//     });
// }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         setAuthenticated,
//         userId,
//         setUserId,
//         userName,
//         setUserName,
//         token,
//         setToken,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };
