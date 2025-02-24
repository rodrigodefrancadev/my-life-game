import "./App.css";
import { AuthProvider, Sex, useAuth } from "./contexts/auth";

function App() {
  return (
    <AuthProvider>
      <AuthTeste />
    </AuthProvider>
  );
}

function AuthTeste() {
  const { authUser, login, logout, signup, completeUser } = useAuth();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Auth Test</h1>
      <button onClick={() => login("teste@email.com", "123456")}>Login</button>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => signup("teste@email.com", "123456")}>
        Signup
      </button>
      <button
        onClick={() =>
          completeUser("Nome Teste", new Date("1994-06-05"), Sex.M)
        }
      >
        Completar Usuário
      </button>
      <p>{authUser ? `User: ${authUser.uuid}` : "No user"}</p>
      <p>
        {authUser && authUser.userData
          ? "Usuário Completo"
          : "Usuário Incompleto"}
      </p>
    </div>
  );
}

export default App;
