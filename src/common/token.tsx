import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export const generateAuthJwt = (payload: any) => {
  const { expiresIn, ...params } = payload;
  const key: any = process.env.SECRET_KEY;
  const token = jwt.sign(params, key, { expiresIn });

  return token;
};
// This function is used for verifing token
export const verifyToken = async (token: string) => {
  try {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    const key: any = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, key);
    return decoded ;
  } catch (error) {
    return false
  }
};
