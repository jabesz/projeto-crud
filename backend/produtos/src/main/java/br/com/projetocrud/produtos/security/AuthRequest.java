package br.com.projetocrud.produtos.security;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {
  private String email;
  private String password;
}