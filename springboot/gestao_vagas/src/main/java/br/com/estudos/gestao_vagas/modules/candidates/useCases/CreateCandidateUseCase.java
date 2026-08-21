package br.com.estudos.gestao_vagas.modules.candidates.useCases;

import br.com.estudos.gestao_vagas.exceptions.UserFoundException;
import br.com.estudos.gestao_vagas.modules.candidates.entities.CandidateEntity;
import br.com.estudos.gestao_vagas.modules.candidates.repositories.CandidateRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Serviço responsável por executar a lógica de criação de candidatos.
 * <p>
 * Antes de salvar um novo candidato, verifica se já existe um usuário com o
 * mesmo nome de usuário ou e-mail. Caso exista, lança uma
 * {@link UserFoundException}.
 * </p>
 */
@Service
public class CreateCandidateUseCase {

    private final CandidateRepository candidateRepository;
    private final PasswordEncoder passwordEncoder;

    public CreateCandidateUseCase(CandidateRepository candidateRepository, PasswordEncoder passwordEncoder) {
        this.candidateRepository = candidateRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Executa o processo de criação de um novo candidato.
     * <p>
     * Verifica se já existe um candidato com o mesmo username ou email. Se
     * existir, uma exceção {@link UserFoundException} é lançada. Caso
     * contrário, o candidato é persistido no banco de dados.
     * </p>
     *
     * @param candidateEntity o objeto contendo os dados do candidato a ser
     *                        criado
     * @return o candidato salvo no banco de dados
     * @throws UserFoundException se já existir um utilizador com o mesmo username
     *                            ou email
     */
    public CandidateEntity execute(CandidateEntity candidateEntity) {
        this.candidateRepository.findByUsernameOrEmail(candidateEntity.getUsername(), candidateEntity.getEmail())
                .ifPresent(user -> {
                    throw new UserFoundException();
                });

        var password = passwordEncoder.encode(candidateEntity.getPassword());
        candidateEntity.setPassword(password);

        return this.candidateRepository.save(candidateEntity);
    }
}
