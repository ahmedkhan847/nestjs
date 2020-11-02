import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  private errorMessages: any = {
    CreateTodoDto: 'Unable to create todo',
  };
  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, { abortEarly: false });
    if (error) {
      throw new BadRequestException({
        status: false,
        message: this.errorMessages[metadata.metatype.name],
        errors: error.details,
        data: [],
      });
    }
    return value;
  }
}
