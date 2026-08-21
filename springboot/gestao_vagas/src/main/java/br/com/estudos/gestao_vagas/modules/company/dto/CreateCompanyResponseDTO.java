package br.com.estudos.gestao_vagas.modules.company.dto;

import br.com.estudos.gestao_vagas.modules.company.entities.CompanyEntity;
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
public class CreateCompanyResponseDTO {
    private UUID id;

    @Schema(example = "Itau")
    private String name;

    @Schema(example = "Itau27")
    private String username;

    @Schema(example = "teste@itau.com")
    private String email;

    @Schema(example = "Banco privado do Brasil")
    private String description;

    @Schema(example = "12345678000195", requiredMode = Schema.RequiredMode.REQUIRED)
    private String cnpj;

    @Schema(example = "https://itau.com")
    private String website;

    public static CreateCompanyResponseDTO from(CompanyEntity companyEntity) {
        return CreateCompanyResponseDTO.builder()
                .id(companyEntity.getId())
                .name(companyEntity.getName())
                .username(companyEntity.getUsername())
                .email(companyEntity.getEmail())
                .description(companyEntity.getDescription())
                .cnpj(companyEntity.getCnpj())
                .website(companyEntity.getWebsite())
                .build();
    }
}
