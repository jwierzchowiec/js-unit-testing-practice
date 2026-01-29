export interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

interface IQuantityValidator {
  validate(quantity: number): ValidationResult;
}

export class QuantityValidator implements IQuantityValidator {
  private threshold: number;
  private packageSize: number;

  constructor(threshold: number, packageSize: number) {
    if (threshold < 0) throw new Error('Threshold must be non-negative');
    if (packageSize <= 0) throw new Error('Package size must be positive');
    this.threshold = threshold;
    this.packageSize = packageSize;
  }

  validate(quantity: number): ValidationResult {
    if(quantity <= 0) {
      return {
        isValid: false,
        error: 'Quantity should be positive'
      }
    }
    if(quantity >= this.threshold && quantity % this.packageSize !== 0) {
      return {
        isValid: false,
        error: `Quantity should be divisible by ${this.packageSize}`
      } 
    }
    return {
      isValid: true,
      error: null
    };
  }
}