import { db } from "../database/db.js";
import dayjs from "dayjs";

export async function getHome(req, res) {
  try {
    const { id } = req.headers;
    const arrayBalance = await db
      .collection("balance")
      .find({ id: id })
      .toArray();
    res.send(arrayBalance);

    if (!arrayBalance) {
      res.sendStatus(400);
      return;
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
    return;
  }
}

export async function operation(req, res) {
  try {
    const { value, type, id } = req.body;
    const date = dayjs(new Date()).format("DD/MM");
    const user = await db.collection("users").findOne({ email: id });

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    let balance;
    if (type === "exit") {
      balance = (Number(user.balance) - Number(value)).toFixed(2);
    } else if (type === "entry") {
      balance = (Number(user.balance) + Number(value)).toFixed(2);
    }

    await db
      .collection("users")
      .updateOne({ email: id }, { $set: { balance: balance } });

    await db.collection("balance").insertOne({ ...req.body, date: date });

    res.status(200).json(balance);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
    return;
  }
}
