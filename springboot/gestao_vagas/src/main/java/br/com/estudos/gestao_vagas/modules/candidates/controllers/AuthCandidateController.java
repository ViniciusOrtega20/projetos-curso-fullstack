package br.com.estudos.gestao_vagas.modules.candidates.controllers;

import br.com.estudos.gestao_vagas.modules.candidates.dto.auth.AuthCandidateRequestDTO;
import br.com.estudos.gestao_vagas.modules.candidates.dto.auth.AuthCandidateResponseDTO;
import br.com.estudos.gestao_vagas.modules.candidates.useCases.AuthCandidateUseCase;
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
@RequestMapping("/candidate")
public class AuthCandidateController {

    private final AuthCandidateUseCase authCandidateUseCase;

    public AuthCandidateController(AuthCandidateUseCase authCandidateUseCase) {
        this.authCandidateUseCase = authCandidateUseCase;
    }

    @PostMapping("/auth")
    @Tag(name = "Auth", description = "Autenticação")
    @Operation(summary = "Faz a autenticação do candidato", description = "Função responsável por fazer a autenticação do candidato")
    @ApiResponses(
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = AuthCandidateResponseDTO.class)
                    )
            })
    )
    public ResponseEntity<Object> login(@RequestBody AuthCandidateRequestDTO authCandidateRequestDTO) {
        try {
            var result = this.authCandidateUseCase.execute(authCandidateRequestDTO);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
