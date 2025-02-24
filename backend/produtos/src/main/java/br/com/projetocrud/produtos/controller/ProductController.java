package br.com.projetocrud.produtos.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rota")
public class ProductController {

  @GetMapping
  public String rota() {
    return "API esta funcionando!";
  }
}