package br.com.estudos.gestao_vagas.modules.company.useCases;

import br.com.estudos.gestao_vagas.modules.company.dto.auht.AuthCompanyRequestDTO;
import br.com.estudos.gestao_vagas.modules.company.dto.auht.AuthCompanyResponseDTO;
import br.com.estudos.gestao_vagas.modules.company.repositories.CompanyRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Service
public class AuthCompanyUseCase {

    @Value("${security.token.secret.company}")
    private String secretKey;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthCompanyUseCase(CompanyRepository companyRepository, PasswordEncoder passwordEncoder) {
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthCompanyResponseDTO execute(AuthCompanyRequestDTO authCompanyRequestDTO) throws AuthenticationException {
        var company = this.companyRepository.findByUsername(authCompanyRequestDTO.username()).orElseThrow(
                () -> new UsernameNotFoundException("Username/password incorrect")
        );
        var passwordMatches = this.passwordEncoder.matches(authCompanyRequestDTO.password(), company.getPassword());

        if (!passwordMatches) {
            throw new AuthenticationException();
        }

        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        var expiredIn = Instant.now().plus(Duration.ofHours(2));
        var token = JWT.create().withIssuer("javagas")
                .withExpiresAt(expiredIn)
                .withClaim("roles", List.of("COMPANY"))
                .withSubject(company.getId().toString())
                .sign(algorithm);

        return AuthCompanyResponseDTO.builder()
                .acessToken(token)
                .expiresIn(expiredIn.toEpochMilli())
                .build();
    }
}
