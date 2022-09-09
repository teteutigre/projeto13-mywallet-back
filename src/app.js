import express from "express";
import cors from "cors";
import joi from "joi";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.number().required(),
});

const signUpSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.number().required(),
  password: joi.number().required().min(6),
  passwordConfirm: joi.number().required().min(6),
});

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect().then(() => {
  db = mongoClient.db("MyWallet");
});

// faltando validar
app.post("/sign-up", async (req, res) => {
  try {
    const validate = signInSchema.validate(req.body);
    const { email, password } = req.body;
    const user = await db.collection("users").findOne({ email });

    console.log(req.body);

    if (req.body && bcrypt.compareSync(senha, user.senha)) {
      //token pra ele bem fofo
    } else if (validate.error) {
      res.status(422);
      return;
    }
  } catch (err) {
    res.status(500).send(err);
    return;
  }
});

// faltando validar
app.post("/sign-in", async (req, res) => {
  try {
    const validate = signUpSchema.validate(req.body);
    const { email, password, name } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    const confirm = await db.collection("users").FindOne({ email });

    if (confirm) {
      res.sendStatus(409).send("Email ja registrado");
      return;
    } else {
      await db.collection("users").insertOne(email, password, name);
      await db.collection("users").insertOne({ ...user, senha: passwordHash });
    }
  } catch (err) {
    res.status(500).send(err);
    return;
  }
});

app.listen(5000, () => console.log("Listening on port 5000"));
