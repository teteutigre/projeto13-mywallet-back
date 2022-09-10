import { Router } from "express";
import { operation, getHome } from "../Controllers/operationController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import validateToken from "../middlewares/validateToken.js";
import { operationSchema } from "../schemas/operationSchema.js";

const router = Router();

router.post(
  "/operation",
  validateToken,
  validateSchema(operationSchema),
  operation
);

router.get("/home", getHome);

export default router;
