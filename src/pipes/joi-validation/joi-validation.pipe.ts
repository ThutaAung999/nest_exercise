import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, { abortEarly: false }); // `abortEarly: false` collects all errors
    if (error) {
      // Extract specific error messages
      const messages = error.details.map((detail) => detail.message).join(', ');
      throw new BadRequestException(messages); // Throw only specific error messages
    }
    return value;
  }
}
