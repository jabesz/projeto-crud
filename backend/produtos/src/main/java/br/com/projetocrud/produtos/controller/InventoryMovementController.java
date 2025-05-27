package br.com.projetocrud.produtos.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.com.projetocrud.produtos.dto.InventoryMovementDTO;
import br.com.projetocrud.produtos.service.InventoryMovementService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/movements")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class InventoryMovementController {
  private final InventoryMovementService movementService;

  @GetMapping
  public List<InventoryMovementDTO> getAllMovements() {
    return movementService.getAllMovements();
  }

  @GetMapping("/{id}")
  public InventoryMovementDTO getMovementById(@PathVariable Long id) {
    return movementService.getMovementById(id);
  }

  @PostMapping
  public InventoryMovementDTO createMovement(@RequestBody InventoryMovementDTO movementDTO) {
    return movementService.createMovement(movementDTO);
  }

  @DeleteMapping("/{id}")
  public void deleteMovement(@PathVariable Long id) {
    movementService.deleteMovement(id);
  }
}
