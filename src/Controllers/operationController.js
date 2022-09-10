import { db } from "../database/db.js";
import dayjs from "dayjs";

export async function getHome(req, res) {
  try {
    const arrayBalance = await db.collection("balance").find().toArray();
    res.send(arrayBalance);
    return;
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
    return;
  }
}

export async function operation(req, res) {
  try {
    const { value, type, email } = req.body;
    const date = dayjs(new Date()).format("DD/MM");
    const user = await db.collection("users").findOne({ email });

    await db.collection("balance").insertOne({ ...req.body, date });

    if (type === "exit") {
      value - user.balance;
    } else if (type === "entry") {
      value + user.balance;
    }
    res.status(200).send("ok");
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
    return;
  }
}
