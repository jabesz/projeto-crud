package br.com.projetocrud.produtos.service;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import br.com.projetocrud.produtos.dto.UserDTO;
import br.com.projetocrud.produtos.entity.UserModel;
import br.com.projetocrud.produtos.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

  @Autowired
  private final UserRepository userRepository;

  private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public UserDTO createUser(UserDTO userDTO) {
    String encryptedPassword = passwordEncoder.encode(userDTO.getPassword());

    UserModel user = new UserModel();
    user.setName(userDTO.getName());
    user.setEmail(userDTO.getEmail());
    user.setPassword(encryptedPassword);

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
      user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
    }

    UserModel updatedUser = userRepository.save(user);
    return new UserDTO(updatedUser);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}
