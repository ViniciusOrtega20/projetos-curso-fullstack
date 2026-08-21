package br.com.estudos.gestao_vagas.modules.candidates.useCases;

import br.com.estudos.gestao_vagas.modules.candidates.dto.ProfileCandidateResponseDTO;
import br.com.estudos.gestao_vagas.modules.candidates.repositories.CandidateRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ProfileCandidateUseCase {

    private final CandidateRepository candidateRepository;

    public ProfileCandidateUseCase(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    public ProfileCandidateResponseDTO execute(UUID idCandidate) {
        var candidate = this.candidateRepository.findById(idCandidate)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return ProfileCandidateResponseDTO.builder()
                .id(candidate.getId())
                .name(candidate.getName())
                .username(candidate.getUsername())
                .email(candidate.getEmail())
                .description(candidate.getDescription())
                .build();
    }
}
