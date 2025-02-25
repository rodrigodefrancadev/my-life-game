import { createContext } from "react";
import { AuthUser, Sex } from "./types";

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
  completeUser: async (_displayName: string, _birthday: Date, _sex: Sex) => {},
};

const AuthContext = createContext(defaultValue);

export default AuthContext;
