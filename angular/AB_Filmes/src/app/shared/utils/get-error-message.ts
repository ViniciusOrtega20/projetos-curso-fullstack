import {HttpErrorResponse} from '@angular/common/http';

export function getErrorMessage(error: Error | undefined): string {
  const cause = error?.cause as HttpErrorResponse;

  if (!cause) return '';

  switch (cause.status) {
    case 0:
      return 'Sem conexão com a internet ou servidor offline.';

    case 401:
      return cause.error?.message ?? 'Email ou senha inválidos.';

    case 500:
      return 'Ocorreu um erro interno no servidor.';

    default:
      return cause.error?.message ?? 'Ocorreu um erro inesperado ao tentar acessar.';
  }
}
