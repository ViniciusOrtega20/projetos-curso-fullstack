package br.com.estudos.gestao_vagas.modules.company.dto.job;

import br.com.estudos.gestao_vagas.modules.company.dto.CompanyResponseDTO;
import br.com.estudos.gestao_vagas.modules.company.entities.JobEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobResponseListDTO {
    private UUID id;

    @Schema(example = "Dev fullstack")
    private String description;

    @Schema(example = "GymPass, Plano de saúde e vale refeição")
    private String benefits;

    @Schema(example = "Senior")
    private String level;

    private CompanyResponseDTO company;

    public static List<JobResponseListDTO> from(List<JobEntity> jobEntitys) {
        return jobEntitys.stream().map(jobEntity -> JobResponseListDTO.builder()
                .id(jobEntity.getId())
                .description(jobEntity.getDescription())
                .benefits(jobEntity.getBeneficios())
                .level(jobEntity.getLevel())
                .company(CompanyResponseDTO.from(jobEntity.getCompanyEntity()))
                .build()
        ).toList();
    }
}
