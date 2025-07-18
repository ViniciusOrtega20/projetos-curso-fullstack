package br.com.estudos.gestao_vagas.modules.company.useCases;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.estudos.gestao_vagas.exceptions.UserFoundException;
import br.com.estudos.gestao_vagas.modules.company.entities.CompanyEntity;
import br.com.estudos.gestao_vagas.modules.company.repositories.CompanyRepository;

@Service
public class CreateCompanyUseCase {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public CompanyEntity execute(CompanyEntity companyEntity) {
        var existingUser = companyRepository.findByUsernameOrEmail(
                companyEntity.getUsername(), companyEntity.getEmail());

        if (existingUser.isPresent()) {
            throw new UserFoundException();
        }
        var password = passwordEncoder.encode(companyEntity.getPassword());
        companyEntity.setPassword(password);

        return this.companyRepository.save(companyEntity);
    }
}
