package br.com.projetocrud.produtos.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import br.com.projetocrud.produtos.entity.UserModel;

@Repository
public interface UserRepository extends CrudRepository<UserModel, Long> {
  Optional<UserModel> findByEmail(String email);
}
