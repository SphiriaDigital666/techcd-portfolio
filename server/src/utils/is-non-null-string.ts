import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsNonNullString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNonNullString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && value.trim() !== '';
        },
        defaultMessage() {
          return 'Value must be a non-empty string';
        },
      },
    });
  };
}
