package br.com.estudos.gestao_vagas.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Gestão de Vagas",
                description = "API responsável pela gestão de vagas",
                version = "1.0.0"
        )
)
@SecurityScheme(
        name = SwaggerConfig.SECURITY_SCHEME_NAME,
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
public class SwaggerConfig {
    public static final String SECURITY_SCHEME_NAME = "jwt_auth";

}
