package br.com.projetocrud.produtos.dto;

import br.com.projetocrud.produtos.entity.UserModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
  public UserDTO(UserDTO userDTO) {

  }
  public UserDTO(UserModel save) {

  }
  private Long id;
  private String username;
  private String email;
}
