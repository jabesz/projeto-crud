package br.com.projetocrud.produtos.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.projetocrud.produtos.dto.InventoryMovementDTO;
import br.com.projetocrud.produtos.entity.InventoryMovementModel;

@Repository
public interface InventoryMovementRepository extends CrudRepository<InventoryMovementModel, Long> {

  InventoryMovementModel save(InventoryMovementDTO movement);

}
