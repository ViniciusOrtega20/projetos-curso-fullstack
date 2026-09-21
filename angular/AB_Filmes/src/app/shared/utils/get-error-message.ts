import {HttpErrorResponse} from '@angular/common/http';

export function getErrorMessage(error: Error | undefined): string {
  if (error == null) return '';

  let httpError: unknown = error;

  if (error instanceof Error && !(error instanceof HttpErrorResponse)) {
    httpError = error.cause;
  }

  if (!(httpError instanceof HttpErrorResponse)) {
    return 'Ocorreu um erro inesperado.';
  }

  switch (httpError.status) {
    case 0:
      return 'Sem conexão com a internet ou servidor offline.';

    case 401:
      return httpError.error?.message ?? 'Email ou senha inválidos.';

    case 500:
      return 'Ocorreu um erro interno no servidor.';

    default:
      return httpError.error?.message ?? 'Ocorreu um erro inesperado ao tentar acessar.';
  }
}
