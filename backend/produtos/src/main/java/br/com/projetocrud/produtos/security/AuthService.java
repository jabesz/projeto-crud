package br.com.projetocrud.produtos.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final AuthenticationManager authenticationManager;
  private final UserDetailsService userDetailsService;
  private final JwtUtil jwtUtil;
  private final PasswordEncoder passwordEncoder;

  public String authenticate(String email, String password) {
    System.out.println("Tentando autenticar: " + email);
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
    System.out.println("Autenticação bem-sucedida");

    UserDetails userDetails = userDetailsService.loadUserByUsername(email);
    System.out.println("Usuário encontrado: " + userDetails.getUsername());

    if (!passwordEncoder.matches(password, userDetails.getPassword())) {
      throw new BadCredentialsException("Credenciais inválidas");
    }

    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

    return jwtUtil.generateToken(userDetails.getUsername());
  }
}
