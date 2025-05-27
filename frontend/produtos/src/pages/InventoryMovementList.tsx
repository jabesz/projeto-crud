import React, { useState, useEffect } from 'react';
import { InventoryMovement, Product } from '../types';
import { inventoryMovementService } from "../services/inventoryMovementService.ts";
import { productService } from '../services/productService.ts';
import Navbar from "../components/Navbar.tsx";
import Sidebar from '../components/Sidebar.tsx';
import Modal from "bootstrap/js/dist/modal";
import '../assets/styles.css';

const InventoryMovementList: React.FC = () => {
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  const [newMovement, setNewMovement] = useState({
    productId: "",
    type: "",
    quantity: 1,
    description: "",
  });

  const [saving, setSaving] = useState(false);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [movementsData, productsData] = await Promise.all([
        inventoryMovementService.getAllMovements(),
        productService.getAllProducts()
      ]);
      
      // Adicionar nome do produto às movimentações
      const enhancedMovements = movementsData.map(movement => {
        const product = productsData.find(p => p.id === movement.productId);
        return {
          ...movement,
          productName: product ? product.name : 'Produto não encontrado'
        };
      });
      
      setMovements(enhancedMovements);
      setProducts(productsData);
      setError('');
    } catch (err: any) {
      setError('Erro ao carregar dados: ' + (err.message || 'Erro desconhecido'));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMovement = async () => {
    // Validação simples
    if (!newMovement.productId || !newMovement.type || newMovement.quantity < 1) {
      alert('Preencha todos os campos corretamente!');
      return;
    }
  
    setSaving(true);
  
    try {
      // Criar movimentação (converter productId para number)
      const movementToCreate = {
        ...newMovement,
        productId: Number(newMovement.productId)
      } as InventoryMovement;
  
      const createdMovement = await inventoryMovementService.createMovement(movementToCreate);
  
      // Adicionar nome do produto
      const product = products.find(p => p.id === createdMovement.productId);
      const movementWithProductName = {
        ...createdMovement,
        productName: product ? product.name : 'Produto não encontrado'
      };
  
      // Atualizar lista local
      setMovements(prev => [movementWithProductName, ...prev]);
  
      // Resetar form
      setNewMovement({ productId: '', type: '', quantity: 1, description: '' });
  
      // Fechar modal programaticamente (usando Bootstrap 5)
      const modalEl = document.getElementById('newMovementModal');
      if (modalEl) {
        const modalInstance = Modal.getInstance(modalEl);
        modalInstance?.hide();
      }
  
      setError('');
    } catch (err: any) {
      setError('Erro ao salvar movimentação: ' + (err.message || 'Erro desconhecido'));
    } finally {
      setSaving(false);
    }
  };
  

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setNewMovement((prev) => ({
      ...prev,
      [id]: id === "quantity" ? Number(value) : value,
    }));
  };
  

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    
    if (window.confirm('Tem certeza que deseja excluir esta movimentação?')) {
      try {
        await inventoryMovementService.deleteMovement(id);
        setMovements(movements.filter(movement => movement.id !== id));
      } catch (err: any) {
        setError('Erro ao excluir movimentação: ' + (err.message || 'Erro desconhecido'));
      }
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Filtrar movimentações com base no termo de pesquisa
  const filteredMovements = movements.filter(movement => 
    movement.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMovements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMovements.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  return (
    <div className="d-flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`main-content ${
          sidebarOpen
            ? "main-content-with-sidebar"
            : "main-content-with-sidebar-collapsed"
        }`}
      >
        <Navbar />

        <div className="container-fluid p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Movimentações de Estoque</h2>
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#newMovementModal"
            >
              <i className="fas fa-plus me-2"></i>Nova Movimentação
            </button>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="card mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar movimentações..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                  <button className="btn btn-outline-secondary me-2">
                    <i className="fas fa-filter me-1"></i>Filtros
                  </button>
                  <button className="btn btn-outline-secondary">
                    <i className="fas fa-download me-1"></i>Exportar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="table-container">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                <p className="mt-2">Carregando movimentações...</p>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Tipo</th>
                        <th>Quantidade</th>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((movement) => (
                          <tr key={movement.id}>
                            <td>{movement.id}</td>
                            <td>{movement.productName}</td>
                            <td>
                              <span
                                className={`badge ${
                                  movement.type === "ENTRADA"
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                              >
                                {movement.type}
                              </span>
                            </td>
                            <td>{movement.quantity}</td>
                            <td>{formatDate(movement.movementDate)}</td>
                            <td>{movement.description}</td>
                            <td>
                              <div className="btn-group">
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDelete(movement.id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center py-4">
                            <i
                              className="fas fa-exchange-alt mb-3"
                              style={{ fontSize: "2rem", color: "#ccc" }}
                            ></i>
                            <p>Nenhuma movimentação encontrada</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {filteredMovements.length > itemsPerPage && (
                  <nav>
                    <ul className="pagination justify-content-center">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage - 1)}
                        >
                          Anterior
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <li
                          key={i}
                          className={`page-item ${
                            currentPage === i + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage + 1)}
                        >
                          Próximo
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal para nova movimentação */}
      <div
        className="modal fade"
        id="newMovementModal"
        tabIndex={-1}
        aria-labelledby="newMovementModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newMovementModalLabel">
                Nova Movimentação
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="productId" className="form-label">
                    Produto
                  </label>
                  <select className="form-select" id="productId" required>
                    <option value="">Selecione um produto</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Tipo de Movimentação
                  </label>
                  <select className="form-select" id="type" required>
                    <option value="">Selecione o tipo</option>
                    <option value="ENTRADA">Entrada</option>
                    <option value="SAIDA">Saída</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    min="1"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descrição
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows={3}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveMovement}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Salvando...
                  </>
                ) : (
                  "Registrar Movimentação"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryMovementList;
