package br.com.estudos.gestao_vagas.modules.company.dto.job;

import io.swagger.v3.oas.annotations.media.Schema;

public record CreateJobRequestDTO(
        @Schema(example = "Dev fullstack", requiredMode = Schema.RequiredMode.REQUIRED)
        String description,

        @Schema(example = "GymPass, Plano de saúde e vale refeição", requiredMode = Schema.RequiredMode.REQUIRED)
        String benefits,

        @Schema(example = "Senior", requiredMode = Schema.RequiredMode.REQUIRED)
        String level
) {
}
