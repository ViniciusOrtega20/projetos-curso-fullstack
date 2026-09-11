package br.com.estudos.gestao_vagas.modules.candidates.controllers;

import br.com.estudos.gestao_vagas.config.SwaggerConfig;
import br.com.estudos.gestao_vagas.modules.candidates.dto.create.CreateCandidatoRequestDTO;
import br.com.estudos.gestao_vagas.modules.candidates.dto.create.CreateCandidatoResponseDTO;
import br.com.estudos.gestao_vagas.modules.candidates.dto.profile.ProfileCandidateResponseDTO;
import br.com.estudos.gestao_vagas.modules.candidates.entities.CandidateEntity;
import br.com.estudos.gestao_vagas.modules.candidates.useCases.CreateCandidateUseCase;
import br.com.estudos.gestao_vagas.modules.candidates.useCases.ListAllJobsByFilterUseCase;
import br.com.estudos.gestao_vagas.modules.candidates.useCases.ProfileCandidateUseCase;
import br.com.estudos.gestao_vagas.modules.company.dto.job.JobResponseListDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Controlador responsável por gerenciar operações relacionadas a candidatos.
 */
@RestController
@RequestMapping("/candidate")
public class CandidateController {

    private final CreateCandidateUseCase createCandidateUseCase;
    private final ProfileCandidateUseCase profileCandidateUseCase;
    private final ListAllJobsByFilterUseCase listAllJobsByFilterUseCase;

    public CandidateController(CreateCandidateUseCase createCandidateUseCase, ProfileCandidateUseCase profileCandidateUseCase, ListAllJobsByFilterUseCase listAllJobsByFilterUseCase) {
        this.createCandidateUseCase = createCandidateUseCase;
        this.profileCandidateUseCase = profileCandidateUseCase;
        this.listAllJobsByFilterUseCase = listAllJobsByFilterUseCase;
    }

    @PostMapping("/")
    @Tag(name = "Candidato", description = "Informações do candidato")
    @Operation(summary = "Cria um utilizador candidato", description = "Função responsável por criar um utilizador candidato")
    @ApiResponses(
            @ApiResponse(responseCode = "201", content = {
                    @Content(
                            schema = @Schema(implementation = CreateCandidatoResponseDTO.class)
                    )
            })
    )
    public ResponseEntity<Object> create(@Valid @RequestBody CreateCandidatoRequestDTO createCandidatoRequestDTO) {
        try {
            var candidateEntity = CandidateEntity.builder()
                    .name(createCandidatoRequestDTO.getName())
                    .username(createCandidatoRequestDTO.getUsername())
                    .email(createCandidatoRequestDTO.getEmail())
                    .password(createCandidatoRequestDTO.getPassword())
                    .description(createCandidatoRequestDTO.getDescription())
                    .curriculo(createCandidatoRequestDTO.getCurriculo())
                    .build();

            var result = this.createCandidateUseCase.execute(candidateEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body(CreateCandidatoResponseDTO.from(result));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

    @GetMapping("/")
    @PreAuthorize("hasRole('CANDIDATE')")
    @Tag(name = "Candidato", description = "Informações do candidato")
    @Operation(summary = "Lista as informações do perfil do candidato", description = "Função responsável por listar as informações do perfil do candidato")
    @ApiResponses(
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = ProfileCandidateResponseDTO.class)
                    )
            })
    )
    @SecurityRequirement(name = SwaggerConfig.SECURITY_SCHEME_NAME)
    public ResponseEntity<Object> getProfile(HttpServletRequest request) {
        var idCandidate = request.getAttribute("candidate_id");
        try {
            var result = this.profileCandidateUseCase.execute(UUID.fromString(idCandidate.toString()));
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/job")
    @PreAuthorize("hasRole('CANDIDATE')")
    @Tag(name = "Vagas", description = "Informações das vagas")
    @Operation(summary = "Listagem de vaga disponivel para o candidato", description = "Função responsável por listar todas as vagas disponiveis baseada no filtro")
    @ApiResponses(
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            array = @ArraySchema(schema = @Schema(implementation = JobResponseListDTO.class))
                    )
            })

    )
    @SecurityRequirement(name = SwaggerConfig.SECURITY_SCHEME_NAME)
    public List<JobResponseListDTO> findJobByFilter(@RequestParam String filter) {
        return listAllJobsByFilterUseCase.execute(filter);
    }
}
