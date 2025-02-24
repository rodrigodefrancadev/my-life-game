import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {
  connectDataConnectEmulator,
  getDataConnect,
} from "firebase/data-connect";
import { connectorConfig } from "@firebasegen/default-connector";
import firebaseConfig from "../firebase-config";

const useEmulators = true; // Set this flag to true to use emulators

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dc = getDataConnect(connectorConfig);

if (useEmulators) {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectDataConnectEmulator(dc, "localhost", 9399);
}

export { app, auth, dc };
