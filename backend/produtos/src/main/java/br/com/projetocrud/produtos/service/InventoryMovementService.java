package br.com.projetocrud.produtos.service;

import java.util.List;
import java.util.stream.StreamSupport;
import org.springframework.stereotype.Service;
import br.com.projetocrud.produtos.dto.InventoryMovementDTO;
import br.com.projetocrud.produtos.entity.InventoryMovementModel;
import br.com.projetocrud.produtos.repository.InventoryMovementRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InventoryMovementService {

  private final InventoryMovementRepository inventoryMovementRepository;

  public List<InventoryMovementDTO> getAllMovements() {
    Iterable<InventoryMovementModel> movement = inventoryMovementRepository.findAll();
    return StreamSupport.stream(movement.spliterator(), false)
        .map(InventoryMovementDTO::new)
        .toList();
  }

  public InventoryMovementDTO getMovementById(Long id) {
    return inventoryMovementRepository.findById(id)
        .map(InventoryMovementDTO::new)
        .orElseThrow(() -> new RuntimeException("Movement not found"));
  }

  public InventoryMovementDTO createMovement(InventoryMovementDTO movementDTO) {
    InventoryMovementModel movement = new InventoryMovementModel(movementDTO);
    return new InventoryMovementDTO(inventoryMovementRepository.save(movement));
  }

  public void deleteMovement(Long id) {
    inventoryMovementRepository.deleteById(id);
  }
}
