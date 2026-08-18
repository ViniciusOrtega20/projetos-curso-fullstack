package br.com.estudos.gestao_vagas.modules.company.dto;

import br.com.estudos.gestao_vagas.modules.company.entities.JobEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateJobResponseDTO {
    private UUID id;
    private String description;
    private String benefits;
    private String level;

    public static CreateJobResponseDTO from(JobEntity job) {
        return CreateJobResponseDTO.builder()
                .id(job.getId())
                .description(job.getDescription())
                .benefits(job.getBeneficios())
                .level(job.getLevel())
                .build();
    }
}
