package br.com.projetocrud.produtos.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import org.springframework.stereotype.Service;

import br.com.projetocrud.produtos.dto.ProductDTO;
import br.com.projetocrud.produtos.entity.ProductModel;
import br.com.projetocrud.produtos.repository.ProductRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

  private final ProductRepository productRepository;

  public List<ProductDTO> getAllProducts() {
    Iterable<ProductModel> produtos = productRepository.findAll();

    return StreamSupport.stream(produtos.spliterator(), false)
        .map(ProductDTO::new)
        .toList();
}

  public ProductDTO getProductById(Long id) {
    Optional<ProductDTO> product = productRepository.findById(id).map(ProductDTO::new);
    return product.orElseThrow(() -> new RuntimeException("Product not found"));
  }

  public ProductDTO createProduct(ProductDTO productDTO) {
    ProductDTO product = new ProductDTO(productDTO);
    return new ProductDTO(productRepository.save(product));
  }

  public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
    ProductModel product = productRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found"));
    product.updateFromDTO(productDTO);
    return new ProductDTO(productRepository.save(product));
  }

  public void deleteProduct(Long id) {
    productRepository.deleteById(id);
  }
}
