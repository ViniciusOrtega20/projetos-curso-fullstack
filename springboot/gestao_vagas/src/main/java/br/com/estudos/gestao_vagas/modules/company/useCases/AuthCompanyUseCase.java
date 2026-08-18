package br.com.estudos.gestao_vagas.modules.company.useCases;

import br.com.estudos.gestao_vagas.modules.company.dto.AuthCompanyRequestDTO;
import br.com.estudos.gestao_vagas.modules.company.dto.AuthCompanyResponseDTO;
import br.com.estudos.gestao_vagas.modules.company.repositories.CompanyRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthCompanyResponseDTO execute(AuthCompanyRequestDTO authCompanyRequestDTO) throws AuthenticationException {
        var company = this.companyRepository.findByUsername(authCompanyRequestDTO.getUsername()).orElseThrow(
                () -> new UsernameNotFoundException("Username/password incorrect")
        );
        var passwordMatches = this.passwordEncoder.matches(authCompanyRequestDTO.getPassword(), company.getPassword());

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
                .acess_token(token)
                .expiresIn(expiredIn.toEpochMilli())
                .build();
    }
}
