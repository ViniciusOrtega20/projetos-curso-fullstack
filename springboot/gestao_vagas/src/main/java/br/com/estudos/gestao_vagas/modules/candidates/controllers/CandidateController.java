package br.com.estudos.gestao_vagas.modules.candidates.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.estudos.gestao_vagas.modules.candidates.CandidateEntity;
import jakarta.validation.Valid;

/**
 * Controlador responsável por gerenciar operações relacionadas a candidatos.
 */
@RestController
@RequestMapping("/candidate")
public class CandidateController {

    /**
     * Endpoint para criar um novo candidato.
     *
     * @param candidateEntity entidade contendo os dados do candidato, validada
     * automaticamente
     */
    @PostMapping("/")
    public void create(@Valid @RequestBody CandidateEntity candidateEntity) {
        System.out.println("Candidato: " + candidateEntity.getName());
    }
}
