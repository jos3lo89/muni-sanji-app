import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  const result = await bcrypt.hash(password, 12);
  return result;
}

export async function verifyPassword(data: { password: string; hash: string }) {
  const { hash, password } = data;
  const result = await bcrypt.compare(password, hash);
  return result;
}
