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

  public UserDTO createUser(UserDTO userDTO) {
    UserModel user = new UserModel();
    user.setName(userDTO.getName());
    user.setEmail(userDTO.getEmail());
    user.setPassword(userDTO.getPassword()); // texto plano

    UserModel savedUser = userRepository.save(user);
    return new UserDTO(savedUser);
  }

  public List<UserDTO> getAllUsers() {
    Iterable<UserModel> users = userRepository.findAll();

    return StreamSupport.stream(users.spliterator(), false)
        .map(UserDTO::new)
        .toList();
  }

  public UserDTO getUserById(Long id) {
    Optional<UserModel> user = userRepository.findById(id);

    return user.map(UserDTO::new)
        .orElseThrow(() -> new RuntimeException("User not found"));
  }

  public UserDTO updateUser(Long id, UserDTO userDTO) {
    UserModel user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));

    user.setName(userDTO.getName());
    user.setEmail(userDTO.getEmail());
    if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
      user.setPassword(userDTO.getPassword()); // texto plano
    }

    UserModel updatedUser = userRepository.save(user);
    return new UserDTO(updatedUser);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}
