package br.com.rocketseat.ioc_di;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/componente")
public class MeuControllerComponente {

    @Autowired
    MeuComponente meuComponente;

    @GetMapping("/")
    public String chamandoComponente(){
        var resultado = meuComponente.chamarMeuComponente();
        return resultado;
    }
}
