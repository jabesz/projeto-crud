import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { productService } from '../services/productService.ts';
import Navbar from "../components/Navbar.tsx";
import Sidebar from "../components/Sidebar.tsx";
import '../assets/styles.css';

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [product, setProduct] = useState<Product>({
    name: '',
    category: '',
    description: '',
    price: 0,
    quantity: 0,
    supplier: '',
    initialStock: 0
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchProduct(parseInt(id));
    }
  }, [id]);

  const fetchProduct = async (productId: number) => {
    try {
      setLoading(true);
      const data = await productService.getProductById(productId);
      setProduct(data);
    } catch (err: any) {
      setError('Erro ao carregar produto: ' + (err.message || 'Erro desconhecido'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Converter valores numéricos
    if (name === 'price') {
      setProduct({ ...product, [name]: parseFloat(value) || 0 });
    } else if (name === 'quantity' || name === 'initialStock') {
      setProduct({ ...product, [name]: parseInt(value) || 0 });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (id && id !== 'new') {
        await productService.updateProduct(parseInt(id), product);
      } else {
        await productService.createProduct(product);
      }
      navigate('/products');
    } catch (err: any) {
      setError('Erro ao salvar produto: ' + (err.message || 'Erro desconhecido'));
      setSaving(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="d-flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`main-content ${sidebarOpen ? 'main-content-with-sidebar' : 'main-content-with-sidebar-collapsed'}`}>
          <Navbar />
          <div className="container-fluid p-4">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-2">Carregando dados do produto...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`main-content ${sidebarOpen ? 'main-content-with-sidebar' : 'main-content-with-sidebar-collapsed'}`}>
        <Navbar />
        
        <div className="container-fluid p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">{id && id !== 'new' ? 'Editar Produto' : 'Novo Produto'}</h2>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => navigate('/products')}
            >
              <i className="fas fa-arrow-left me-2"></i>Voltar
            </button>
          </div>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Nome do Produto*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="category" className="form-label">Categoria*</label>
                    <select
                      className="form-select"
                      id="category"
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="Eletrônicos">Eletrônicos</option>
                      <option value="Alimentos">Alimentos</option>
                      <option value="Vestuário">Vestuário</option>
                      <option value="Móveis">Móveis</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>
                  
                  <div className="col-md-12">
                    <label htmlFor="description" className="form-label">Descrição</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows={3}
                      value={product.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  
                  <div className="col-md-4">
                    <label htmlFor="price" className="form-label">Preço (R$)*</label>
                    <div className="input-group">
                      <span className="input-group-text">R$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="form-control"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <label htmlFor="quantity" className="form-label">Quantidade em Estoque*</label>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      value={product.quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-4">
                    <label htmlFor="supplier" className="form-label">Fornecedor*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="supplier"
                      name="supplier"
                      value={product.supplier}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  {id === 'new' && (
                    <div className="col-md-4">
                      <label htmlFor="initialStock" className="form-label">Estoque Inicial</label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        id="initialStock"
                        name="initialStock"
                        value={product.initialStock}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
                
                <div className="d-flex justify-content-end mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-2"
                    onClick={() => navigate('/products')}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Salvando...
                      </>
                    ) : (
                      'Salvar Produto'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
