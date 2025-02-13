import responseMessages from "../data/responseMessages.js";

export const invalidRequest = (res, requiredField) =>
  res.status(400).json({
    message: `${responseMessages.invalidRequest}, ${requiredField} ${responseMessages.validation.isRequired}.`,
  });
