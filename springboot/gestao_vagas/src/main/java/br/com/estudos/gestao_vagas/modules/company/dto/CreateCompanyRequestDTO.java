package br.com.estudos.gestao_vagas.modules.company.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateCompanyRequestDTO {
    @Schema(example = "Itau")
    private String name;

    @Schema(example = "Itau27")
    private String username;

    @Schema(example = "teste@itau.com")
    private String email;

    @Schema(example = "itau@1234567")
    private String password;

    @Schema(example = "Banco privado do Brasil")
    private String description;

    @Schema(example = "12345678000195", requiredMode = Schema.RequiredMode.REQUIRED)
    private String cnpj;

    @Schema(example = "https://itau.com")
    private String website;
}
