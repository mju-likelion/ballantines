import { FileValidator } from '@nestjs/common';

type ValidationOptions = {
  maxFilenameLength: number;
};

export class CvFileValidator extends FileValidator<ValidationOptions> {
  buildErrorMessage(file: any): string {
    return `Validation failed (expected filename length is less than ${this.validationOptions.maxFilenameLength})`;
  }

  isValid(file?: any): boolean | Promise<boolean> {
    if (!this.validationOptions) {
      return true;
    }

    return file.originalname.length < this.validationOptions.maxFilenameLength;
  }
}
