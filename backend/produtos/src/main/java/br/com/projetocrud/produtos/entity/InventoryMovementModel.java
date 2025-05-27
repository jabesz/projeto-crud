package br.com.projetocrud.produtos.entity;

import java.time.LocalDateTime;

import br.com.projetocrud.produtos.dto.InventoryMovementDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "inventory_movements")
public class InventoryMovementModel {
  
  public InventoryMovementModel(InventoryMovementDTO dto) {
    this.productId = dto.getProductId();
    this.quantity = dto.getQuantity();
    this.type = dto.getType();
    this.movementDate = dto.getMovementDate();
    this.description = dto.getDescription();
  }
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long productId;
  private Integer quantity;
  private String type;
  private LocalDateTime movementDate;
  private String description;


}
