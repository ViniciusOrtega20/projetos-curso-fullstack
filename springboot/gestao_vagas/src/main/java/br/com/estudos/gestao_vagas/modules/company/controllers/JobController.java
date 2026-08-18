package br.com.estudos.gestao_vagas.modules.company.controllers;

import br.com.estudos.gestao_vagas.modules.company.dto.CreateJobRequestDTO;
import br.com.estudos.gestao_vagas.modules.company.dto.CreateJobResponseDTO;
import br.com.estudos.gestao_vagas.modules.company.entities.JobEntity;
import br.com.estudos.gestao_vagas.modules.company.useCases.CreateJobUseCase;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private CreateJobUseCase createJobUseCase;

    @PostMapping("/")
    public ResponseEntity<CreateJobResponseDTO> create(@Valid @RequestBody CreateJobRequestDTO createJobRequestDTO, HttpServletRequest request) {
        var companyId = UUID.fromString(request.getAttribute("company_id").toString());
        var jobEntity = JobEntity.builder()
                .beneficios(createJobRequestDTO.getBenefits())
                .companyId(companyId)
                .description(createJobRequestDTO.getDescription())
                .level(createJobRequestDTO.getLevel())
                .build();

        var job = this.createJobUseCase.execute(jobEntity);

        return ResponseEntity.status(HttpStatus.CREATED).body(CreateJobResponseDTO.from(job));
    }
}
