import joi from "joi";

export const operationSchema = joi.object({
  value: joi.number().required(),
  Description: joi.string().required(),
  type: joi.string().valid("entry", "exit").required(),
  email: joi.string().required().email(),
});
