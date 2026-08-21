package br.com.estudos.gestao_vagas.modules.company.controllers;

import br.com.estudos.gestao_vagas.exceptions.UserFoundException;
import br.com.estudos.gestao_vagas.modules.company.dto.CompanyRequestDTO;
import br.com.estudos.gestao_vagas.modules.company.dto.CompanyResponseDTO;
import br.com.estudos.gestao_vagas.modules.company.entities.CompanyEntity;
import br.com.estudos.gestao_vagas.modules.company.useCases.CreateCompanyUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/company")
public class CompanyController {

    private final CreateCompanyUseCase createCompanyUseCase;

    public CompanyController(CreateCompanyUseCase createCompanyUseCase) {
        this.createCompanyUseCase = createCompanyUseCase;
    }

    @PostMapping("/")
    @Tag(name = "Companny", description = "Informações do company")
    @Operation(summary = "Cria um utilizador empresa", description = "Função responsável por criar um utilizador empresa")
    @ApiResponses(
            @ApiResponse(responseCode = "201", content = {
                    @Content(
                            schema = @Schema(implementation = CompanyResponseDTO.class)
                    )
            })
    )
    public ResponseEntity<Object> create(@Valid @RequestBody CompanyRequestDTO companyRequestDTO) {
        try {
            var companyEntity = CompanyEntity.builder()
                    .username(companyRequestDTO.getUsername())
                    .email(companyRequestDTO.getEmail())
                    .password(companyRequestDTO.getPassword())
                    .website(companyRequestDTO.getWebsite())
                    .cnpj(companyRequestDTO.getCnpj())
                    .name(companyRequestDTO.getName())
                    .description(companyRequestDTO.getDescription())
                    .build();
            var result = this.createCompanyUseCase.execute(companyEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body(CompanyResponseDTO.from(result));
        } catch (UserFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
