import joi from "joi";

export const operationSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
  type: joi.string().valid("entry", "exit").required(),
  id: joi.string().required().email(),
});
