import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { environmentVariables as EV } from "./consts.js";

export const verifyToken = async (bearerToken: string) => {
  const client = jwksClient({
    jwksUri: `https://${EV.issuer}.well-known/jwks.json`,
  });

  const decodedToken = jwt.decode(bearerToken, { complete: true });

  const kid = decodedToken.header.kid;
  const key = await client.getSigningKey(kid);
  const signingKey = key.getPublicKey();

  return new Promise((resolve, reject) => {
    jwt.verify(
      bearerToken,
      signingKey,
      {
        audience: EV.audience,
        issuer: `https://${EV.issuer}`,
        algorithms: ["RS256"],
      },
      (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      }
    );
  });
};
