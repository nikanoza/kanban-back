import Joi from "joi";

const createBoardSchema = Joi.object({
  title: Joi.string().required().trim(),
  columns: Joi.array().items(Joi.string().required().trim()).min(1),
});

export default createBoardSchema;
