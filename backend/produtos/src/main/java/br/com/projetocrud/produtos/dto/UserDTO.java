package br.com.projetocrud.produtos.dto;

import br.com.projetocrud.produtos.entity.UserModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

  public UserDTO(UserModel user) {
    this.id = user.getId();
    this.name = user.getName();
    this.email = user.getEmail();
    this.password = user.getPassword();
  }

  private Long id;
  private String name;
  private String email;
  private String password;
}
