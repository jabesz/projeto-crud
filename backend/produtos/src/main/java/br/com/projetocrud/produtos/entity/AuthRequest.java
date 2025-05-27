package br.com.projetocrud.produtos.entity;

import lombok.Data;

@Data
public class AuthRequest {
  private String email;
  private String password;
}
