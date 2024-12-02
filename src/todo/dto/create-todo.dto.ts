import * as Joi from 'joi';

export class CreateTodoDto {
  id?: string;
  title?: string;
  name?: string;
}

export const CreateTodoSchema = Joi.object({
  id: Joi.string().optional(),
  title: Joi.string().min(3).max(255).required().options({ abortEarly: false }),
  name: Joi.string().required(),
});
