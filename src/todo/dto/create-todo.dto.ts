import { IsNotEmpty, IsString } from 'class-validator';
//import * as Joi from 'joi';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty({ message: 'Id is required' })
  id?: string;

  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title?: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name?: string;
}

/* export const CreateTodoSchema = Joi.object({
  id: Joi.string().optional(),
  title: Joi.string().min(3).max(255).required().messages({
    'string.min': 'Title must be at least 3 characters long',
    'string.max': 'Title must not exceed 255 characters',
    'any.required': 'Title is required',
  }),
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
  }),
}); */
