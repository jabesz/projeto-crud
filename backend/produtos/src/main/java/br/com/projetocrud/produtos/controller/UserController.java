package br.com.projetocrud.produtos.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

import br.com.projetocrud.produtos.dto.UserDTO;
import br.com.projetocrud.produtos.service.UserService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class UserController {

  private final UserService userService;

  @GetMapping("/api/auth/list")
  public List<UserDTO> getAllUsers() {
    return userService.getAllUsers();
  }

  @PostMapping("/api/auth/register")
  public UserDTO createUser(@RequestBody UserDTO userDTO) {
    return userService.createUser(userDTO);
  }

  @GetMapping("/api/auth/{id}")
  public UserDTO getUserById(@PathVariable Long id) {
    return userService.getUserById(id);
  }

  @PutMapping("/api/auth/{id}")
  public UserDTO updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
    return userService.updateUser(id, userDTO);
  }

  @DeleteMapping("/api/auth/{id}")
  public void deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
  }
}
