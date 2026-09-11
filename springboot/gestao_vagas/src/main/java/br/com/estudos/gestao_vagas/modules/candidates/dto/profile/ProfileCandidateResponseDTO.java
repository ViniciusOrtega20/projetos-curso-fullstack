package br.com.estudos.gestao_vagas.modules.candidates.dto.profile;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileCandidateResponseDTO {
    private UUID id;

    @Schema(example = "joaoP")
    private String username;

    @Schema(example = "joao@teste.com")
    private String email;

    @Schema(example = "João Pedro")
    private String name;

    @Schema(example = "Dev Fullstack")
    private String description;
}
