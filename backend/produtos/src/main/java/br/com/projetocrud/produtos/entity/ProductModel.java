package br.com.projetocrud.produtos.entity;

import br.com.projetocrud.produtos.dto.ProductDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
public class ProductModel {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String mark;
  private Integer quantity;
  private String description;
  private String category;
  private String supplier;
  private Double price;
  private Integer initialStock;

  public void updateFromDTO(ProductDTO productDTO) {
    this.name = productDTO.getName();
    this.quantity = productDTO.getQuantity();
    this.price = productDTO.getPrice();
    this.description = productDTO.getDescription();
    this.category = productDTO.getCategory();
    this.supplier = productDTO.getSupplier();
    this.initialStock = productDTO.getInitialStock();
  }

  public ProductModel() {
  }

  public ProductModel(Long id, String name, Integer initialStock) {
    this.id = id;
    this.name = name;
    this.initialStock = initialStock;
  }

  public ProductModel(ProductDTO productDTO) {
    this.name = productDTO.getName();
    this.category = productDTO.getCategory();
    this.description = productDTO.getDescription();
    this.price = productDTO.getPrice();
    this.quantity = productDTO.getQuantity();
    this.supplier = productDTO.getSupplier();
    this.initialStock = productDTO.getInitialStock();
  }

}