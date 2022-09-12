import { db } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  try {
    const { email, password, name } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = bcrypt.hashSync(password, salt);
    const confirm = await db.collection("users").findOne({ email });

    if (confirm) {
      res.status(409).send("Email invalido");
      return;
    } else {
      await db
        .collection("users")
        .insertOne({ email, passwordHash, name, balance: 0 });
      res.status(200).send("ok");
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
    return;
  }
}

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const user = await db.collection("users").findOne({ email });

    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      const token = uuid();
      const name = user.name;

      await db.collection("sessions").insertOne({
        userId: email,
        token,
      });

      res.status(200).send({ name, token, id: email, balance: user.balance });
      return;
    } else {
      res.status(401).send("Email ou senha incorretos");
      return;
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
    return;
  }
}
