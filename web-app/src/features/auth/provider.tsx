import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import AuthContext from "./context";
import { AuthUser } from "./types";
import authController from "./use-cases";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    authController.readyPromise.then(() => {
      setReady(true);
    });

    authController.subscribe((user) => {
      setAuthUser(user);
    });

    return () => {
      authController.dispose();
    };
  }, [setReady, setAuthUser]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        login: authController.signin,
        logout: auth.signOut,
        signup: authController.signin,
        completeUser: authController.completeUser,
      }}
    >
      {ready ? children : <p>Carregando Auth...</p>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
