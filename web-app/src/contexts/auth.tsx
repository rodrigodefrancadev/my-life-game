import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, dc } from "../firebase";
import { createMyUser, getMyUser } from "@firebasegen/default-connector";

export interface AuthUser {
  uuid: string;
  userData: UserData | null;
}

export enum Sex {
  M = "M",
  F = "F",
}

interface UserData {
  displayName: string;
  birthday: Date;
  sex: Sex;
}

export interface IAuthContext {
  authUser: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  completeUser: (
    displayName: string,
    birthday: Date,
    sex: Sex
  ) => Promise<void>;
}

const defaultValue: IAuthContext = {
  authUser: null,
  // eslint-disable-next-line
  login: async (_email: string, _password: string) => {},
  logout: async () => {},
  // eslint-disable-next-line
  signup: async (_email: string, _password: string) => {},
  // eslint-disable-next-line
  completeUser: async (_displayName: string, _birthday: Date, sex: Sex) => {},
};

export const AuthContext = createContext(defaultValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  const completeUser = useCallback(
    async (displayName: string, birthday: Date, sex: Sex) => {
      if (!authUser) {
        console.log("Usuário não autenticado");
        return;
      }

      if (authUser.userData) {
        console.log("Usuário já está completo");
        return;
      }

      await createMyUser(dc, {
        birthday: birthday.toISOString().split("T")[0],
        displayName: displayName,
        sex: sex,
      });

      setAuthUser({ ...authUser, userData: { birthday, displayName, sex } });
    },
    [setAuthUser, authUser]
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const getMyUserResult = await getMyUser(dc);
        console.log(getMyUserResult);
        const userData: UserData | null = getMyUserResult.data.user
          ? {
              birthday: new Date(getMyUserResult.data.user.birthday),
              displayName: getMyUserResult.data.user.displayName,
              sex: getMyUserResult.data.user.sex as Sex,
            }
          : null;
        setAuthUser({ uuid: user.uid, userData });
      } else {
        setAuthUser(null);
      }
      setReady(true);
    });
    return unsubscribe;
  }, [setReady, setAuthUser]);

  return (
    <AuthContext.Provider
      value={{ authUser, login, logout, signup, completeUser }}
    >
      {ready ? children : <p>Carregando Auth...</p>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
