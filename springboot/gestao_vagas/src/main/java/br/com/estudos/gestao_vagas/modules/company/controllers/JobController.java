package br.com.estudos.gestao_vagas.modules.company.controllers;

import br.com.estudos.gestao_vagas.config.SwaggerConfig;
import br.com.estudos.gestao_vagas.modules.company.dto.job.CreateJobRequestDTO;
import br.com.estudos.gestao_vagas.modules.company.dto.job.CreateJobResponseDTO;
import br.com.estudos.gestao_vagas.modules.company.entities.JobEntity;
import br.com.estudos.gestao_vagas.modules.company.useCases.CreateJobUseCase;
import io.swagger.v3.oas.annotations.Operation;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/company/job")
@PreAuthorize("hasRole('COMPANY')")
public class JobController {

    private final CreateJobUseCase createJobUseCase;

    public JobController(CreateJobUseCase createJobUseCase) {
        this.createJobUseCase = createJobUseCase;
    }

    @PostMapping("/")
    @Tag(name = "Vagas", description = "Informações das vagas")
    @Operation(summary = "Cadastro de vagas", description = "Função responsável por cadastrar uma vaga")
    @ApiResponses(
            @ApiResponse(responseCode = "201", content = {
                    @Content(
                            schema = @Schema(implementation = CreateJobResponseDTO.class)
                    )
            })
    )
    @SecurityRequirement(name = SwaggerConfig.SECURITY_SCHEME_NAME)
    public ResponseEntity<CreateJobResponseDTO> create(@Valid @RequestBody CreateJobRequestDTO createJobRequestDTO, HttpServletRequest request) {
        var companyId = UUID.fromString(request.getAttribute("company_id").toString());
        var jobEntity = JobEntity.builder()
                .beneficios(createJobRequestDTO.benefits())
                .companyId(companyId)
                .description(createJobRequestDTO.description())
                .level(createJobRequestDTO.level())
                .build();

        var job = this.createJobUseCase.execute(jobEntity);

        return ResponseEntity.status(HttpStatus.CREATED).body(CreateJobResponseDTO.from(job));
    }
}
