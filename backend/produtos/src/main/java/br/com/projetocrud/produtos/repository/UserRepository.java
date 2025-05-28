package br.com.projetocrud.produtos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.projetocrud.produtos.entity.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long> {
  List<UserModel> findAllByEmail(String email);

}