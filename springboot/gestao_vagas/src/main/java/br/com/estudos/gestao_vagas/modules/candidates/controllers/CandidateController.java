package br.com.estudos.gestao_vagas.modules.candidates.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.estudos.gestao_vagas.modules.candidates.CandidateEntity;
import br.com.estudos.gestao_vagas.modules.candidates.useCases.CreateCandidateUseCase;
import jakarta.validation.Valid;

/**
 * Controlador responsável por gerenciar operações relacionadas a candidatos.
 */
@RestController
@RequestMapping("/candidate")
public class CandidateController {

    @Autowired
    private CreateCandidateUseCase createCandidateUseCase;

    /**
     * Endpoint para criar um novo candidato.
     *
     * @param candidateEntity entidade contendo os dados do candidato, validada
     * automaticamente
     * @return
     */
    @PostMapping("/")
    public ResponseEntity<Object> create(@Valid @RequestBody CandidateEntity candidateEntity) {
        try {
            var result = this.createCandidateUseCase.execute(candidateEntity);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
