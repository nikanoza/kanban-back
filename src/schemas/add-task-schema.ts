import Joi from "joi";
import { NewTask } from "types";

const addTaskSchema = async (_: NewTask) => {
  return Joi.object<NewTask>({
    title: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    subtasks: Joi.array().items(Joi.string().required().trim()).min(1),
  });
};
export default addTaskSchema;
