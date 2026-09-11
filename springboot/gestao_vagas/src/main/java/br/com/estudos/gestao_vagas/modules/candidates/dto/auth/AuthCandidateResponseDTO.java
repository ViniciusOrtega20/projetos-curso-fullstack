package br.com.estudos.gestao_vagas.modules.candidates.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthCandidateResponseDTO {
    @Schema(example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJqYXZhZ2FzIiwiZXhwIjoxNzg3MjY5MjkyLCJyb2xlcyI6WyJDQU5ESURBVEUiXSwic3ViIjoiNGFlMGEzY2Mt")
    private String acessToken;

    @Schema(example = "1234569887845")
    private Long expiresIn;
}
