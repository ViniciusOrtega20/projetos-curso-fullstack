package br.com.estudos.gestao_vagas.modules.company.entities;

import io.swagger.v3.oas.annotations.media.Schema;
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

import java.util.UUID;

@Entity(name = "company")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    /**
     * Nome de usuário para autenticação. Não pode estar vazio ou conter
     * espaços.
     */
    @Schema(example = "Itau27")
    @NotBlank(message = "O campo [username] não pode estar vazio")
    @Pattern(regexp = "\\S+", message = "O campo [username] não deve conter espaços")
    private String username;

    /**
     * Email válido do candidato.
     */
    @Schema(example = "teste@itau.com")
    @Email(message = "O campo [email] deve conter um email válido")
    private String email;

    /**
     * Senha com tamanho entre 10 e 30 caracteres.
     */
    @Size(min = 10, max = 80, message = "O campo [password] deve ter entre 10 e 80 caracteres")
    private String password;
    private String website;

    @Size(min = 14, max = 14, message = "O campo [CNPJ] deve ter 14 caracteres")
    private String cnpj;
    private String name;
    private String description;
}
