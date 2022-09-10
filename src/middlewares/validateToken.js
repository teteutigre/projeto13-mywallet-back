import { db } from "../database/db.js";

async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!authorization) {
    return res.status(401).send("Haders faltando");
  }

  const session = await db.collection("sessions").findOne({ token });

  if (!session) {
    return res.status(401).send("token invalido");
  }

  res.locals.session = session;
  next();
}

export default validateToken;
