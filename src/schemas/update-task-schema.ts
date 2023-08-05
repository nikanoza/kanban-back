import Joi, { CustomHelpers } from "joi";
import { Task } from "models";
import { TaskType } from "types";

type EditTask = {
  taskId: string;
  title: string;
};

const determineIfTaskExists =
  (task: TaskType | null) => (value: string, helpers: CustomHelpers) => {
    if (!task) {
      return helpers.error("any.invalid");
    }

    return value;
  };

const updateTaskSchema = async (data: EditTask) => {
  const task = await Task.findOne({ id: data.taskId });

  return Joi.object<EditTask>({
    taskId: Joi.string().custom(determineIfTaskExists(task)).required(),
    title: Joi.string().required().trim(),
  });
};
export default updateTaskSchema;
