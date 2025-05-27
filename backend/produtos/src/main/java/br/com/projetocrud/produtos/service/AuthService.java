package br.com.projetocrud.produtos.service;

import java.util.List;

import org.springframework.stereotype.Service;
import br.com.projetocrud.produtos.entity.UserModel;
import br.com.projetocrud.produtos.repository.UserRepository;

@Service
public class AuthService {

  private final UserRepository userRepository;

  public AuthService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public boolean authenticate(String email, String password) {
    List<UserModel> users = userRepository.findAllByEmail(email);
    if (!users.isEmpty()) {
      UserModel user = users.get(0);
      return user.getPassword().equals(password);
    }
    return false;

  }
}
