import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  //useEffect,
} from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>("abcd1234edgh4321i1j2k3l4");

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     if (!localStorage.getItem("token")) {
  //       const response = await fetch(
  //         "https://notifymebackend.onrender.com/api/v1/get-token"
  //       );
  //       const data = await response.json();
  //       setToken(data.token);
  //       localStorage.setItem("token", data.token);
  //     }
  //   };

  //   fetchToken();
  // }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
