package br.com.estudos.gestao_vagas.modules.candidates.repositories;

import br.com.estudos.gestao_vagas.modules.candidates.entities.CandidateEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repositório responsável por operações de acesso a dados da entidade
 * {@link CandidateEntity}.
 * <p>
 * Estende {@link JpaRepository}, fornecendo métodos prontos para operações
 * CRUD, paginação e ordenação. Também define um método customizado para busca
 * por username ou email.
 * </p>
 */
public interface CandidateRepository extends JpaRepository<CandidateEntity, UUID> {

    Optional<CandidateEntity> findByUsernameOrEmail(String username, String email);

    Optional<CandidateEntity> findByUsername(String username);
}
