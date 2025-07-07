package br.com.estudos.gestao_vagas.exceptions;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Classe responsável por capturar e tratar exceções de forma global na
 * aplicação.
 */
@ControllerAdvice
public class ExceptionHandlerController {

    private final MessageSource messageSource;

    public ExceptionHandlerController(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    /**
     * Trata exceções de validação lançadas pelo @Valid.
     *
     * @param exception exceção capturada
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ErrorMessageDTO>> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        List<ErrorMessageDTO> errorMessageDTO = new ArrayList<>();

        exception.getBindingResult().getFieldErrors().forEach(err -> {
            String message = messageSource.getMessage(err, LocaleContextHolder.getLocale());
            errorMessageDTO.add(new ErrorMessageDTO(message, err.getField()));
        });

        return new ResponseEntity<>(errorMessageDTO, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserFoundException.class)
    public ResponseEntity<ErrorMessageDTO> handleUserFoundException(UserFoundException exception) {
        ErrorMessageDTO error = new ErrorMessageDTO(exception.getMessage(), null);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }
}
