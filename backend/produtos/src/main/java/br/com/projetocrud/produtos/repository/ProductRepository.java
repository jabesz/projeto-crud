package br.com.projetocrud.produtos.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.projetocrud.produtos.dto.ProductDTO;
import br.com.projetocrud.produtos.entity.ProductModel;

@Repository
public interface ProductRepository extends CrudRepository<ProductModel, Long> {

  ProductDTO save(ProductDTO product);

}