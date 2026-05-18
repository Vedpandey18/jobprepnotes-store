import { SignJWT, jwtVerify } from "jose";

function secretKey() {
  const raw =
    process.env.ADMIN_JWT_SECRET ||
    "dev-insecure-default-change-me-32chars-minimum-x";
  return new TextEncoder().encode(raw);
}

export async function signAdminToken(email: string): Promise<string> {
  return new SignJWT({ role: "admin", email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secretKey());
}

export async function verifyAdminToken(token: string) {
  const { payload } = await jwtVerify(token, secretKey());
  return payload as { email?: string; role?: string };
}
