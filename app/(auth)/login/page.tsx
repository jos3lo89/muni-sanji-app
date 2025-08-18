import { login } from "@/action/auth.action";

const LoginPage = () => {
  return (
    <form action={login}>
      <h2>entrar</h2>

      <input type="email" name="email" placeholder="Email" required />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        required
      />
      <button type="submit">login</button>
    </form>
  );
};
export default LoginPage;
