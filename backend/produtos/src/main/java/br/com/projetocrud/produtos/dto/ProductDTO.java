package br.com.projetocrud.produtos.dto;

import java.time.LocalDate;

import br.com.projetocrud.produtos.entity.ProductModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
  public ProductDTO(ProductDTO productDTO) {

  }
  public ProductDTO(ProductModel save) {

  }
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
