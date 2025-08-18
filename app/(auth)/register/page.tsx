import { register } from "@/action/auth.action";

const RegisterPage = () => {
  return (
    <div>
      <form action={register}>
        <h2>Crear una cuenta</h2>
        <input type="text" name="name" placeholder="Nombre" required />
        <input type="text" name="lastName" placeholder="Last name" required />
        <input type="text" name="dni" placeholder="DNI" required />
        <select name="role">
          <option value="administrador">administrador</option>
          <option value="mesa_de_partes">Mesa de partes</option>
          <option value="funcionario">funcionario</option>
        </select>

        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
