import { FC } from "react";
import useAuth from "../use-auth";
import { Sex } from "../types";

const AuthTeste: FC = () => {
  const { authUser, login, logout, signup, completeUser } = useAuth();

  return (
    <main
      className="responsive"
      style={{ display: "grid", placeItems: "center" }}
    >
      <article
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <h1>Auth Test</h1>
        <button onClick={() => login("teste@email.com", "123456")}>
          Login
        </button>
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
      </article>
    </main>
  );
};

export default AuthTeste;
