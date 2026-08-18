package br.com.estudos.gestao_vagas.modules.candidates.dto;

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
    private String username;
    private String email;
    private String name;
    private String description;
}
