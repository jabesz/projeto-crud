package br.com.projetocrud.produtos.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.projetocrud.produtos.dto.InventoryMovementDTO;
import br.com.projetocrud.produtos.dto.ProductDTO;
import br.com.projetocrud.produtos.entity.ProductModel;
import br.com.projetocrud.produtos.repository.ProductRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

  @Autowired
  private final ProductRepository productRepository;
  @Autowired
  private final InventoryMovementService inventoryMovementService;

  public List<ProductDTO> getAllProducts() {
    Iterable<ProductModel> produtos = productRepository.findAll();

    return StreamSupport.stream(produtos.spliterator(), false)
        .map(ProductDTO::new)
        .collect(Collectors.toList());
  }

  public ProductDTO getProductById(Long id) {
    ProductModel product = productRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found"));
    return new ProductDTO(product);
  }

   public ProductDTO createProduct(ProductDTO productDTO, boolean createInventoryMovement) {
    ProductModel product = new ProductModel(productDTO);
    product = productRepository.save(product);
    
    if (createInventoryMovement) {
      InventoryMovementDTO movementDTO = new InventoryMovementDTO();
      movementDTO.setProductId(product.getId());
      movementDTO.setQuantity(productDTO.getInitialStock());
      movementDTO.setType("Entrada");
      movementDTO.setMovementDate(LocalDateTime.now());
      movementDTO.setDescription("Entrada inicial de estoque para o produto: " + product.getName());
      inventoryMovementService.createMovement(movementDTO);
    }
    
    return new ProductDTO(product);
  }

  public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
    ProductModel product = productRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found"));

    product.updateFromDTO(productDTO);

    ProductModel updatedProduct = productRepository.save(product);
    return new ProductDTO(updatedProduct);
  }

  public void deleteProduct(Long id) {
    if (!productRepository.existsById(id)) {
      throw new RuntimeException("Product not found");
    }
    productRepository.deleteById(id);
  }
}
