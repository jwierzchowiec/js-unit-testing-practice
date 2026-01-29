import { QuantityValidator, ValidationResult } from 'tasks/task2';

describe('QuantityValidator', () => {
  it('should not return error if quantity is less than threshold', () => {
    const threshold = 10;
    const packageSize = 5;
    const validator = new QuantityValidator(threshold, packageSize);
    const quantity = 9;

    const actual = validator.validate(quantity);

    expect(actual).toEqual<ValidationResult>({
      isValid: true,
      error: null
    });
  });

  it('should not return error if quantity is equal to threshold and divisible by package size', () => {
    const threshold = 10;
    const packageSize = 5;
    const validator = new QuantityValidator(threshold, packageSize);
    const quantity = threshold;

    const actual = validator.validate(quantity);

    expect(actual).toEqual<ValidationResult>({
      isValid: true,
      error: null
    });
  });

  it('should not return error if quantity is greater than threshold and divisible by package size', () => {
    const threshold = 10;
    const packageSize = 5;
    const validator = new QuantityValidator(threshold, packageSize);
    const quantity = 15;

    const actual = validator.validate(quantity);

    expect(actual).toEqual<ValidationResult>({
      isValid: true,
      error: null
    });
  });

  it('should return error if quantity is equal to threshold and indivisible by package size', () => {
    const threshold = 10;
    const packageSize = 6;
    const validator = new QuantityValidator(threshold, packageSize);
    const quantity = threshold;

    const actual = validator.validate(quantity);

    expect(actual).toEqual<ValidationResult>({
      isValid: false,
      error: `Quantity should be divisible by ${packageSize}`
    });
  });

  it('should return error if quantity is greater than threshold and indivisible by package size', () => {
    const threshold = 10;
    const packageSize = 6;
    const validator = new QuantityValidator(threshold, packageSize);
    const quantity = 11;

    const actual = validator.validate(quantity);

    expect(actual).toEqual<ValidationResult>({
      isValid: false,
      error: `Quantity should be divisible by ${packageSize}`
    });
  });

  it.each([-1, 0])('should return error if quantity is not a positive number', (quantity) => {
    const threshold = 10;
    const packageSize = 6;
    const validator = new QuantityValidator(threshold, packageSize);

    const actual = validator.validate(quantity);

    expect(actual).toEqual<ValidationResult>({
      isValid: false,
      error: 'Quantity should be positive'
    });
  });

  it('should throw error if threshold is less than 0', () => {
    const threshold = -1;
    const packageSize = 6;

    expect(() => new QuantityValidator(threshold, packageSize)).toThrow('Threshold must be non-negative');
  });

  it.each([-1, 0])('should throw error if package size is not a positive number [%d]', (packageSize) => {
    const threshold = 10;

    expect(() => new QuantityValidator(threshold, packageSize)).toThrow('Package size must be positive');
  });
});
