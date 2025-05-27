package br.com.projetocrud.produtos.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.projetocrud.produtos.service.AuthService;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody Map<String, String> loginData) {
    String email = loginData.get("email");
    String password = loginData.get("password");

    boolean authenticated = authService.authenticate(email, password);
    if (authenticated) {
      return ResponseEntity.ok("Login realizado com sucesso!");
    } else {
      return ResponseEntity.status(401).body("Credenciais inválidas");
    }
  }
}
