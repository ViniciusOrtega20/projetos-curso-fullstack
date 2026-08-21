package br.com.estudos.gestao_vagas.modules.company.controllers;

import br.com.estudos.gestao_vagas.modules.company.dto.auht.AuthCompanyRequestDTO;
import br.com.estudos.gestao_vagas.modules.company.dto.auht.AuthCompanyResponseDTO;
import br.com.estudos.gestao_vagas.modules.company.useCases.AuthCompanyUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/company")
public class AuthCompanyController {

    private final AuthCompanyUseCase authCompanyUseCase;

    public AuthCompanyController(AuthCompanyUseCase authCompanyUseCase) {
        this.authCompanyUseCase = authCompanyUseCase;
    }

    @PostMapping("/auth")
    @Tag(name = "Auth", description = "Autenticação")
    @Operation(summary = "Faz a autenticação da company", description = "Função responsável por fazer a autenticação da company")
    @ApiResponses(
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = AuthCompanyResponseDTO.class)
                    )
            })
    )
    public ResponseEntity<Object> login(@RequestBody AuthCompanyRequestDTO authCompanyRequestDTO) {
        try {
            var result = this.authCompanyUseCase.execute(authCompanyRequestDTO);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
