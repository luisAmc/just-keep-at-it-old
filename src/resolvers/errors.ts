export class ValidationError extends Error {
  code = 'VALIDATION';
  extensions: Record<string, Record<string, string>>;

  constructor(message: string, properties: Record<string, string>) {
    super(message);

    this.name = 'Validation';
    Object.defineProperty(this, 'name', { value: 'Validation' });

    this.extensions = { properties };
  }
}
