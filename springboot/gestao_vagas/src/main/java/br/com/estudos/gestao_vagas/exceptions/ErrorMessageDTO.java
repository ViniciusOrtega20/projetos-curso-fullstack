package br.com.estudos.gestao_vagas.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO que representa uma mensagem de erro de validação de campo.
 * <p>
 * Usado para retornar informações detalhadas sobre erros em requisições HTTP,
 * geralmente no corpo da resposta em validações do Bean Validation.
 * </p>
 */
@Data
@AllArgsConstructor
public class ErrorMessageDTO {

    private String message;
    private String field;
}
