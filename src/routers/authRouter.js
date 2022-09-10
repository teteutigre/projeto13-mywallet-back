import { Router } from "express";
import { signIn, signUp } from "../Controllers/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";

const router = Router();

router.post("/sign-in", validateSchema(signInSchema), signIn);

router.post("/sign-up", validateSchema(signUpSchema), signUp);

export default router;
