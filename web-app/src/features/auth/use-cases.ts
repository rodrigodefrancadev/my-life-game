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

  constructor() {
    this.readyPromise = new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged(() => {
        this._ready = true;
        resolve();
        unsubscribe();
      });
    });

    auth.onAuthStateChanged(async (user) => {
      console.log("AuthController -> constructor -> user", user);
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

    // bind this all functions
    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
    this.signout = this.signout.bind(this);
    this.completeUser = this.completeUser.bind(this);
  }

  subscribe(callback: (authUser: AuthUser | null) => void): () => void {
    this._onAuthChangeCallBacks.push(callback);
    return () => {
      const index = this._onAuthChangeCallBacks.indexOf(callback);
      if (index >= 0) {
        this._onAuthChangeCallBacks.splice(index, 1);
      }
    };
  }

  async signin(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async signup(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password);
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
