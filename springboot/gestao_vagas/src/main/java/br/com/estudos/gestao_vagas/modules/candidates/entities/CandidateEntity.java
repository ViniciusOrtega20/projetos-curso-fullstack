package br.com.estudos.gestao_vagas.modules.candidates.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Representa um candidato no sistema com as suas informações básicas e
 * credenciais.
 * <p>
 * Esta entidade contém dados pessoais e de autenticação do candidato, além de
 * uma descrição e currículo associados.
 * </p>
 *
 * @author Vinicius Ortega
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "candidate")
public class CandidateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;

    @NotBlank(message = "O campo [username] não pode estar vazio")
    @Pattern(regexp = "\\S+", message = "O campo [username] não deve conter espaços")
    private String username;

    @Email(message = "O campo [email] deve conter um email válido")
    private String email;

    @Size(min = 10, max = 80, message = "O campo [password] deve ter entre 10 e 80 caracteres")
    private String password;
    private String description;
    private String curriculo;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
