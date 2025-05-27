package br.com.projetocrud.produtos.dto;

import br.com.projetocrud.produtos.entity.ProductModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

  public ProductDTO(ProductModel product) {
    this.id = product.getId();
    this.name = product.getName();
    this.quantity = product.getQuantity();
    this.price = product.getPrice();
    this.description = product.getDescription();
    this.category = product.getCategory();
    this.supplier = product.getSupplier();
    this.initialStock = product.getInitialStock() != null ? product.getInitialStock() : 0;
  }

  private Long id;
  private String name;
  private String category;
  private String description;
  private Double price;
  private Integer quantity;
  private String supplier;
  private Integer initialStock;
}
