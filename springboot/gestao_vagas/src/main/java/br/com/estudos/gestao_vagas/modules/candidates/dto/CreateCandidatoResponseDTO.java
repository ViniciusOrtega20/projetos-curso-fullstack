package br.com.estudos.gestao_vagas.modules.candidates.dto;

import br.com.estudos.gestao_vagas.modules.candidates.entities.CandidateEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateCandidatoResponseDTO {
    private UUID id;

    @Schema(example = "Vinicius Ortega")
    private String name;

    @Schema(example = "Ortega99")
    private String username;

    @Schema(example = "ortega@teste.com")
    private String email;

    @Schema(example = "dev full stack senior")
    private String description;

    @Schema(example = "Dev full stack")
    private String curriculo;

    public static CreateCandidatoResponseDTO from(CandidateEntity candidate) {
        return CreateCandidatoResponseDTO.builder()
                .id(candidate.getId())
                .name(candidate.getName())
                .username(candidate.getUsername())
                .email(candidate.getEmail())
                .description(candidate.getDescription())
                .curriculo(candidate.getCurriculo())
                .build();
    }
}
