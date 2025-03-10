package br.com.projetocrud.produtos.entity;

import br.com.projetocrud.produtos.dto.UserDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class UserModel {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String password;
  private String email;
  public void updateFromDTO(UserDTO userDTO) {
    throw new UnsupportedOperationException("Unimplemented method 'updateFromDTO'");
  }
}
