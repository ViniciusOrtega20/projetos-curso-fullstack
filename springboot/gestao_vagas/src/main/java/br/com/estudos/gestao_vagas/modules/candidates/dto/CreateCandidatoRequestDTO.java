package br.com.estudos.gestao_vagas.modules.candidates.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateCandidatoRequestDTO {
    @Schema(example = "Vinicius Ortega", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(example = "Ortega99", requiredMode = Schema.RequiredMode.REQUIRED)
    private String username;

    @Schema(example = "ortega@teste.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;

    @Schema(example = "Ortega@12345", requiredMode = Schema.RequiredMode.REQUIRED)
    private String password;

    @Schema(example = "dev full stack senior", requiredMode = Schema.RequiredMode.REQUIRED)
    private String description;

    @Schema(example = "Dev full stack", requiredMode = Schema.RequiredMode.REQUIRED)
    private String curriculo;
}
