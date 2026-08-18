package br.com.rocketseat.controller;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController

@RequestMapping("/primeiraController")
public class PrimeiraController {
    @GetMapping("/primeiroMetodo/{id}")
    public String primeiroMetodo(@PathVariable String id){
        return "O parametro é: " + id;
    }

    @GetMapping("/metodoComQueryParams")
    public String metodoComQueryParams(@RequestParam String id) {
        return "O parametro é: " + id;
    }

    @GetMapping("/metodoComQueryParams2")
    public String metodoComQueryParams2(@RequestParam Map<String, String> allParams) {
        return "O parametro é: " + allParams.get("id");
    }

    @PostMapping("/metodoComBodyParams")
    public String metodoComBodyParams(@RequestBody Usuario usuario) {
        return "Seu nome é " + usuario.name();
    }

    @PostMapping("/metodoComHeader")
    public String metodoComHeader(@RequestHeader("name") String name) {
        return "Seu nome é " + name;
    }

    @PostMapping("/metodoLisComHeader")
    public String metodoComHeader(@RequestHeader Map<String, String> header) {
        return "Seu nome é " + header.entrySet();
    }

    @PostMapping("/metodoResponseEntity/{id}")
    public ResponseEntity<Object> metodoResponseEntity(@PathVariable long id) {
        Usuario usuario = new Usuario("Vinicius");
        if (id > 5){
            return ResponseEntity.status(HttpStatus.OK).body(usuario);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Número menor que 5");
    }

    record Usuario(String name){}
}
