# 🚀Projeto CRUD
  
## 📌Descrição

Este projeto consiste em um sistema de armazenamento e gerenciamento de produtos, permitindo a criação, leitura, atualização e exclusão de itens. O projeto está sendo desenvolvido como parte da disciplina de Laboratório de Software.

## 🛠️Tecnologias Utilizadas  

- 🌐Frontend: React.js com TypeScript

- ⚙️Backend: Java Spring Boot

- 🗄️Banco de Dados: MySQL

- 🔐Autenticação: JWT (JSON web token)

- 🎨Estilização: Bootstrap

## ✨Funcionalidades

- ✅Adicionar novos produtos ao sistema

- ✅Listar produtos cadastrados

- ✅Atualizar informações de um produto

- ✅Excluir produtos

- ✅Autenticação de usuários para acesso ao sistema

## 🔗 API Endpoints

### **📦 Produtos**

- **GET** `/api/produtos` - 📜 Lista todos os produtos
    
- **POST** `/api/produtos` - ➕ Adiciona um novo produto
    
- **PUT** `/api/produtos/:id` - ✏️ Atualiza um produto existente
    
- **DELETE** `/api/produtos/:id` - ❌ Remove um produto
    

## **🔑 Autenticação**

- **POST** `/api/auth/register` - 👤 Registra um novo usuário
    
- **POST** `/api/auth/login` - 🔑 Realiza login e retorna um token JWT