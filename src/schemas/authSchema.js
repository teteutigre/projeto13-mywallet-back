import joi from "joi";

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const signUpSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.string().required(),
  password: joi.string().required().min(6),
  passwordConfirm: joi.string().required().min(6),
});

export const newEntrySchema = joi.object({
  value: joi.number().required(),
  Description: joi.string().required(),
});

export const newExitSchema = joi.object({
  value: joi.number().required(),
  Description: joi.string().required(),
});
