export interface IFormGroupValidationState {
  readonly touched: boolean;
  readonly dirty: boolean;
  readonly invalid: boolean;
  readonly required: boolean;
  readonly hasValue: boolean;
}