import {SchemaPath, validate} from '@angular/forms/signals';

export function confirmPassword(passwordField: SchemaPath<string>, confirmPasswordField: SchemaPath<string>) {
  validate(confirmPasswordField, ({value, valueOf}) => {
    const password = valueOf(passwordField);
    const confirmPassword = value();

    if (confirmPassword != password) {
      return {
        kind: 'confirmPassword',
        message: 'As senhas devem ser iguais',
      }
    }
    return null;
  })
}
