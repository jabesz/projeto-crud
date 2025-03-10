package br.com.projetocrud.produtos.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projetocrud.produtos.dto.InventoryMovementDTO;
import br.com.projetocrud.produtos.entity.InventoryMovementModel;
import br.com.projetocrud.produtos.repository.InventoryMovementRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InventoryMovementService {

  @Autowired
  private final InventoryMovementRepository inventoryMovementRepository;

  public List<InventoryMovementDTO> getAllMovements() {
    Iterable<InventoryMovementModel> movement = inventoryMovementRepository.findAll();

    return StreamSupport.stream(movement.spliterator(), false)
        .map(InventoryMovementDTO::new)
        .toList();
  }

  public InventoryMovementDTO getMovementById(Long id) {
    Optional<InventoryMovementDTO> movement = inventoryMovementRepository.findById(id).map(InventoryMovementDTO::new);
    return movement.orElseThrow(() -> new RuntimeException("Movement not found"));
  }

  public InventoryMovementDTO createMovement(InventoryMovementDTO movementDTO) {
    InventoryMovementDTO movement = new InventoryMovementDTO(movementDTO);

    return new InventoryMovementDTO(inventoryMovementRepository.save(movement));
  }

  public void deleteMovement(Long id) {
    inventoryMovementRepository.deleteById(id);
  }
}
