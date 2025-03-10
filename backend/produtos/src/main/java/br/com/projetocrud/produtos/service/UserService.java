package br.com.projetocrud.produtos.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import org.springframework.stereotype.Service;

import br.com.projetocrud.produtos.dto.UserDTO;
import br.com.projetocrud.produtos.entity.UserModel;
import br.com.projetocrud.produtos.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  public List<UserDTO> getAllUsers() {
    Iterable<UserModel> users = userRepository.findAll();

    return StreamSupport.stream(users.spliterator(), false)
        .map(UserDTO::new)
        .toList();
  }

  public UserDTO getUserById(Long id) {
    Optional<UserDTO> user = userRepository.findById(id).map(UserDTO::new);
    
    return user.orElseThrow(() -> new RuntimeException("User not found"));
  }

  public UserDTO createUser(UserDTO userDTO) {
    UserDTO user = new UserDTO(userDTO);
    return new UserDTO(userRepository.save(user));
  }

  public UserDTO updateUser(Long id, UserDTO userDTO) {
    UserModel user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));
    user.updateFromDTO(userDTO);
    return new UserDTO(userRepository.save(user));
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}
