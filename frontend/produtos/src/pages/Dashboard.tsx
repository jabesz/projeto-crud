import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Product, InventoryMovement } from '../types';
import { productService } from '../services/productService.ts';
import { inventoryMovementService } from '../services/inventoryMovementService.ts';
import Navbar from "../components/Navbar.tsx";
import '../assets/styles.css';
import Sidebar from '../components/Sidebar.tsx';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [lowStockProducts, setLowStockProducts] = useState<number>(0);
  
  const [categoryData, setCategoryData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Produtos por Categoria',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  });
  
  const [movementData, setMovementData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Entradas',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Saídas',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, movementsData] = await Promise.all([
        productService.getAllProducts(),
        inventoryMovementService.getAllMovements()
      ]);
      
      setProducts(productsData);
      setMovements(movementsData);
      
      calculateStats(productsData, movementsData);
      
      prepareChartData(productsData, movementsData);
      
      setError('');
    } catch (err: any) {
      setError('Erro ao carregar dados: ' + (err.message || 'Erro desconhecido'));
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (products: Product[], movements: InventoryMovement[]) => {
    setTotalProducts(products.length);
    
    const total = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    setTotalValue(total);
    
    const lowStock = products.filter(product => product.quantity < 10).length;
    setLowStockProducts(lowStock);
  };

  const prepareChartData = (products: Product[], movements: InventoryMovement[]) => {
    const categories: { [key: string]: number } = {};
    products.forEach(product => {
      if (product.category) {
        categories[product.category] = (categories[product.category] || 0) + 1;
      }
    });
    
    setCategoryData({
      labels: Object.keys(categories),
      datasets: [
        {
          label: 'Produtos por Categoria',
          data: Object.values(categories),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderWidth: 1,
        },
      ],
    });
    
    const months: string[] = [];
    const entriesData: number[] = [];
    const exitsData: number[] = [];
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      months.push(monthYear);
      
      const entriesForMonth = movements.filter(m => {
        const movDate = new Date(m.movementDate);
        return movDate.getMonth() === date.getMonth() && 
               movDate.getFullYear() === date.getFullYear() && 
               m.type === 'ENTRADA';
      }).reduce((sum, m) => sum + m.quantity, 0);
      
      const exitsForMonth = movements.filter(m => {
        const movDate = new Date(m.movementDate);
        return movDate.getMonth() === date.getMonth() && 
               movDate.getFullYear() === date.getFullYear() && 
               m.type === 'SAIDA';
      }).reduce((sum, m) => sum + m.quantity, 0);
      
      entriesData.push(entriesForMonth);
      exitsData.push(exitsForMonth);
    }
    
    setMovementData({
      labels: months,
      datasets: [
        {
          label: 'Entradas',
          data: entriesData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Saídas',
          data: exitsData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  const recentMovements = movements
    .sort((a, b) => new Date(b.movementDate).getTime() - new Date(a.movementDate).getTime())
    .slice(0, 5);

  const lowStockProductsList = products
    .filter(product => product.quantity < 10)
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 5);

  return (
    <div className="d-flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`main-content ${sidebarOpen ? 'main-content-with-sidebar' : 'main-content-with-sidebar-collapsed'}`}>
        <Navbar />
        
        <div className="container-fluid p-4">
          <h2 className="mb-4">Dashboard</h2>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-2">Carregando dados do dashboard...</p>
            </div>
          ) : (
            <>
              {/* Cards de estatísticas */}
              <div className="row mb-4">
                <div className="col-md-4">
                  <div className="card stats-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="text-muted">Total de Produtos</h6>
                          <h3 className="mb-0">{totalProducts}</h3>
                        </div>
                        <div className="bg-light p-3 rounded">
                          <i className="fas fa-box fa-2x text-primary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card stats-card success">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="text-muted">Valor Total em Estoque</h6>
                          <h3 className="mb-0">R$ {totalValue.toFixed(2)}</h3>
                        </div>
                        <div className="bg-light p-3 rounded">
                          <i className="fas fa-dollar-sign fa-2x text-success"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card stats-card danger">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="text-muted">Produtos com Estoque Baixo</h6>
                          <h3 className="mb-0">{lowStockProducts}</h3>
                        </div>
                        <div className="bg-light p-3 rounded">
                          <i className="fas fa-exclamation-triangle fa-2x text-danger"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Gráficos */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-header">
                      <h5 className="mb-0">Produtos por Categoria</h5>
                    </div>
                    <div className="card-body">
                      <div style={{ height: '300px', display: 'flex', justifyContent: 'center' }}>
                        <Pie data={categoryData} options={{ maintainAspectRatio: false }} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-header">
                      <h5 className="mb-0">Movimentações nos Últimos 6 Meses</h5>
                    </div>
                    <div className="card-body">
                      <div style={{ height: '300px' }}>
                        <Bar 
                          data={movementData} 
                          options={{ 
                            maintainAspectRatio: false,
                            scales: {
                              y: {
                                beginAtZero: true
                              }
                            }
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Listas */}
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Movimentações Recentes</h5>
                      <a href="/movements" className="btn btn-sm btn-outline-primary">Ver Todas</a>
                    </div>
                    <div className="card-body p-0">
                      <div className="list-group list-group-flush">
                        {recentMovements.length > 0 ? (
                          recentMovements.map(movement => {
                            const product = products.find(p => p.id === movement.productId);
                            return (
                              <div key={movement.id} className="list-group-item">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <h6 className="mb-1">
                                      <span className={`badge ${movement.type === 'ENTRADA' ? 'bg-success' : 'bg-danger'} me-2`}>
                                        {movement.type}
                                      </span>
                                      {product?.name || 'Produto não encontrado'}
                                    </h6>
                                    <small className="text-muted">
                                      {formatDate(movement.movementDate)} - {movement.description}
                                    </small>
                                  </div>
                                  <span className="badge bg-secondary">{movement.quantity} unidades</span>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="list-group-item text-center py-4">
                            <i className="fas fa-exchange-alt mb-3" style={{ fontSize: '2rem', color: '#ccc' }}></i>
                            <p>Nenhuma movimentação recente</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Produtos com Estoque Baixo</h5>
                      <a href="/products" className="btn btn-sm btn-outline-primary">Ver Todos</a>
                    </div>
                    <div className="card-body p-0">
                      <div className="list-group list-group-flush">
                        {lowStockProductsList.length > 0 ? (
                          lowStockProductsList.map(product => (
                            <div key={product.id} className="list-group-item">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h6 className="mb-1">{product.name}</h6>
                                  <small className="text-muted">
                                    {product.category} - {product.supplier}
                                  </small>
                                </div>
                                <span className={`badge ${product.quantity <= 5 ? 'bg-danger' : 'bg-warning'}`}>
                                  {product.quantity} unidades
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="list-group-item text-center py-4">
                            <i className="fas fa-check-circle mb-3" style={{ fontSize: '2rem', color: '#ccc' }}></i>
                            <p>Nenhum produto com estoque baixo</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
