package br.com.projetocrud.produtos.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.projetocrud.produtos.dto.UserDTO;
import br.com.projetocrud.produtos.entity.UserModel;

@Repository
public interface UserRepository extends CrudRepository<UserModel, Long> {

  UserDTO save(UserDTO user);
}
