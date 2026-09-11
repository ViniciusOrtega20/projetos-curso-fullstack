package br.com.estudos.gestao_vagas.modules.candidates.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record AuthCandidateRequestDTO(
        @Schema(example = "Ortega99", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull String username,

        @Schema(example = "Ortega@12345", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull String password
) {
}
