import { jwtVerify } from "jose";

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) throw new Error("JWT_SECRET not defined");
  return secret;
};

export const verfiyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified;
  } catch {
    throw new Error("Your token has expired");
  }
};
