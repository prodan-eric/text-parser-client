import { ReactNode, useEffect, useState, createContext } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import Loading from "./Loading";
import { auth } from "../api";

type CurrentUserContext = {
  currentUser: null | User
}

export const AuthContext = createContext<CurrentUserContext>({currentUser: null});

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User|null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setPending(false)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if(pending){
    return <Loading/>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};