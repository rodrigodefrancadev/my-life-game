import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, dc } from "../../firebase";
import { AuthUser, Sex, UserData } from "./types";
import { createMyUser, getMyUser } from "@firebasegen/default-connector";

export class AuthController {
  private _onAuthChangeCallBacks: ((authUser: AuthUser | null) => void)[] = [];

  readyPromise: Promise<void>;
  private _ready = false;
  get ready(): boolean {
    return this._ready;
  }

  private _currentUser: AuthUser | null = null;
  get currentUser(): AuthUser | null {
    return this._currentUser;
  }

  private _disposeFunction: () => void;

  constructor() {
    this.readyPromise = new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged(() => {
        this._ready = true;
        resolve();
      });
      unsubscribe();
    });

    this._disposeFunction = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const getMyUserResult = await getMyUser(dc);
        const userData: UserData | null = getMyUserResult.data.user
          ? {
              birthday: new Date(getMyUserResult.data.user.birthday),
              displayName: getMyUserResult.data.user.displayName,
              sex: getMyUserResult.data.user.sex as Sex,
            }
          : null;
        this._currentUser = {
          uuid: user.uid,
          userData,
        };
      } else {
        this._currentUser = null;
      }

      this._onAuthChangeCallBacks.forEach((callback) => {
        callback(this._currentUser);
      });
    });
  }

  dispose() {
    this._disposeFunction();
  }

  subscribe(callback: (authUser: AuthUser | null) => void) {
    this._onAuthChangeCallBacks.push(callback);
  }

  async signin(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async signup(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  async signout() {
    return await signOut(auth);
  }

  async completeUser(displayName: string, birthday: Date, sex: Sex) {
    if (!this._currentUser) {
      console.log("Usuário não autenticado");
      return;
    }

    if (this._currentUser.userData) {
      console.log("Usuário já está completo");
      return;
    }

    await createMyUser(dc, {
      birthday: birthday.toISOString().split("T")[0],
      displayName: displayName,
      sex: sex,
    });

    this._currentUser = {
      ...this._currentUser,
      userData: { birthday, displayName, sex },
    };

    this._onAuthChangeCallBacks.forEach((callback) => {
      callback(this._currentUser);
    });
  }
}

const authController = new AuthController();
export default authController;
