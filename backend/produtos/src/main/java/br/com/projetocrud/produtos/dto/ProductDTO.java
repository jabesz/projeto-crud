package br.com.projetocrud.produtos.dto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
  private Long id;
  private String name;
  private Integer quantity;
  private Double price;
  private String description;
  private String category;
  private String supplier;
  private LocalDate expirationDate;
  private String barcode;
}
