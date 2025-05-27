package br.com.projetocrud.produtos.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import br.com.projetocrud.produtos.dto.ProductDTO;
import br.com.projetocrud.produtos.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ProductController {

  private final ProductService productService;

  @GetMapping
  public List<ProductDTO> getAllProducts() {
    return productService.getAllProducts();
  }

  @GetMapping("/{id}")
  public ProductDTO getProductById(@PathVariable Long id) {
    return productService.getProductById(id);
  }

  @PostMapping
  public ProductDTO createProduct(@RequestBody ProductDTO productDTO) {
    return productService.createProduct(productDTO, true);
  }

  @PutMapping("/{id}")
  public ProductDTO updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
    return productService.updateProduct(id, productDTO);
  }

  @DeleteMapping("/{id}")
  public void deleteProduct(@PathVariable Long id) {
    productService.deleteProduct(id);
  }
}