package br.com.projetocrud.produtos.repository;

import org.springframework.data.repository.CrudRepository;

import br.com.projetocrud.produtos.model.ProductModel;

public interface ProductRepository extends CrudRepository<ProductModel, Long> {

}