package br.com.estudos.gestao_vagas.exceptions;

/**
 * Exceção lançada quando se tenta criar um usuário que já existe no sistema.
 * <p>
 * Essa exceção é utilizada para indicar conflitos de integridade,
 * como duplicação de username ou e-mail durante o processo de cadastro.
 * </p>
 *
 * @see RuntimeException
 */
public class UserFoundException extends RuntimeException {

    public UserFoundException() {
        super("Usuário já existe");
    }
}
