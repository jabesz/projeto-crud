package br.com.projetocrud.produtos.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryMovementDTO {
  private Long id;
  private Long productId;
  private Integer quantity;
  private String type;
  private LocalDateTime movementDate;
  private String description;
}
