package br.com.projetocrud.produtos.dto;

import java.time.LocalDateTime;

import br.com.projetocrud.produtos.entity.InventoryMovementModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryMovementDTO {
  public InventoryMovementDTO(InventoryMovementModel movement) {
    
  }
  public InventoryMovementDTO(InventoryMovementDTO movementDTO) {
    
  }
  private Long id;
  private Long productId;
  private Integer quantity;
  private String type;
  private LocalDateTime movementDate;
  private String description;
}
