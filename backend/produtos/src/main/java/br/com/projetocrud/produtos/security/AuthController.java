package br.com.projetocrud.produtos.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
    try {
      String token = authService.authenticate(authRequest.getEmail(), authRequest.getPassword());
      return ResponseEntity.ok(new AuthResponse(token));
    } catch (BadCredentialsException e) {
      return ResponseEntity.status(401).body(new AuthResponse("Credenciais inválidas"));
    }
  }
}