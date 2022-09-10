import { Router } from "express";
import {
  signIn,
  signUp,
  newEntry,
  newExit,
  getHome,
} from "../Controllers/authController.js";

const router = Router();

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.post("/newEntry", newEntry);

router.post("/newExit", newExit);

router.get("/home", getHome);

export default router;
