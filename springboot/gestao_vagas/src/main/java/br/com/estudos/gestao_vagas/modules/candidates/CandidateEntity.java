package br.com.estudos.gestao_vagas.modules.candidates;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Representa um candidato no sistema com suas informações básicas e
 * credenciais.
 * <p>
 * Esta entidade contém dados pessoais e de autenticação do candidato, além de
 * uma descrição e currículo associados.
 * </p>
 *
 * @author Vinicius Ortega
 */
@Data
@Entity(name = "candidate")
public class CandidateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    /**
     * Nome de usuário para autenticação. Não pode estar vazio ou conter
     * espaços.
     */
    @NotBlank(message = "O campo [username] não pode estar vazio")
    @Pattern(regexp = "\\S+", message = "O campo [username] não deve conter espaços")
    private String username;

    /**
     * Email válido do candidato.
     */
    @Email(message = "O campo [email] deve conter um email válido")
    private String email;

    /**
     * Senha com tamanho entre 10 e 30 caracteres.
     */
    @Size(min = 10, max = 30, message = "O campo [password] deve ter entre 10 e 30 caracteres")
    private String password;

    private String description;

    private String curriculo;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
