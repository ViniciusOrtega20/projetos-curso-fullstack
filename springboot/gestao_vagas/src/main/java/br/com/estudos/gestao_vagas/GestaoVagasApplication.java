package br.com.estudos.gestao_vagas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Classe principal da aplicação Spring Boot GestaoVagas. Responsável por
 * iniciar o contexto Spring e carregar a aplicação.
 *
 * @author Vinicius Ortega
 */
@SpringBootApplication
public class GestaoVagasApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestaoVagasApplication.class, args);
    }

}
