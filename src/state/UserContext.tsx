// Node modules
import { createContext, ReactNode, useContext, useState } from "react";

// Project files
import iUser from "types/iUser";

// Interfaces
interface iProps {
  children: ReactNode;
}
interface iValues {
  user: iUser | null;
  token: string;
  setUser: Function;
  setToken: Function;
}

// Properties
const initialValues: iValues = {
  user: null,
  token: "",
  setUser: () => {},
  setToken: () => {},
};
const Context = createContext(initialValues);

// Methods
export function UserProvider({ children }: iProps) {
  // Local state
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  // Properties
  const value: iValues = { user, token, setUser, setToken };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useUser() {
  const context = useContext(Context);
  const errorText =
    "To use useUser(), you need to wrap the parent component with <UserProvider/>";

  // Safeguards
  if (!context) throw new Error(errorText);

  return context;
}
