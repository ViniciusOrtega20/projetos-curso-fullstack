package br.com.estudos.gestao_vagas.modules.candidates.useCases;

import br.com.estudos.gestao_vagas.modules.company.repositories.JobRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ListAllJobsByFilterUseCase {

    private final JobRepository jobRepository;

    public ListAllJobsByFilterUseCase(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<Object> execute(String filter) {
        var listaJobs = this.jobRepository.findByDescriptionContainingIgnoreCase(filter);

        if (listaJobs.isEmpty()) {
            return List.of("Não existe job para esse filtro.");
        }

        return Collections.singletonList(listaJobs);
    }
}
