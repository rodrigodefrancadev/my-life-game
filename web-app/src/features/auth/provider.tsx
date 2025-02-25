import { useState, useEffect } from "react";
import AuthContext from "./context";
import { AuthUser } from "./types";
import authController from "./use-cases";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    console.log("AuthProvider -> useEffect", setReady, setAuthUser);
    authController.readyPromise.then(() => {
      setReady(true);
    });

    const unsubscribe = authController.subscribe((user) => {
      console.log("AuthProvider -> user", user);
      setAuthUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        login: authController.signin,
        logout: authController.signout,
        signup: authController.signup,
        completeUser: authController.completeUser,
      }}
    >
      {ready ? children : <p>Carregando Auth...</p>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
