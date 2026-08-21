package br.com.estudos.gestao_vagas.modules.company.dto.auht;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record AuthCompanyRequestDTO(

        @Schema(example = "teste27", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull String username,

        @Schema(example = "teste@1234", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull String password
) {
}
