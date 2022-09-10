import { db } from "../database/db.js";
import bcrypt from "bcrypt";
import { signUpSchema, signInSchema } from "../schemas/authSchema.js";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  try {
    const validate = signUpSchema.validate(req.body, { abortEarly: true });
    const { email, password, name } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = bcrypt.hashSync(password, salt);
    const confirm = await db.collection("users").findOne({ email });

    if (confirm) {
      res.status(409).send("Email invalido");
      return;
    } else if (validate.error) {
      res.status(422).send(validate.error.details);
      return;
    } else {
      await db.collection("users").insertOne({ email, passwordHash, name });
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
    const validate = signInSchema.validate(req.body, { abortEarly: true });
    const { email, password } = req.body;
    const user = await db.collection("users").findOne({ email });

    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      const token = uuid();
      const name = user.name;
      await db.collection("sessions").insertOne({
        userId: user._id,
        token,
      });
      res.status(200).send({ name, token });
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
