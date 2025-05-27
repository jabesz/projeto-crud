import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarProps } from '../types';
import '../assets/styles.css';

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
      <div className="d-flex flex-column p-3 h-100">
        <div className="d-flex align-items-center mb-4">
          {isOpen ? (
            <>
              <i className="fas fa-boxes me-2 fs-4"></i>
              <span className="fs-4 fw-bold">StockManager</span>
              <button 
                className="btn btn-sm ms-auto text-white" 
                onClick={toggleSidebar}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
            </>
          ) : (
            <button 
              className="btn btn-sm mx-auto text-white" 
              onClick={toggleSidebar}
            >
              <i className="fas fa-boxes"></i>
            </button>
          )}
        </div>
        
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-2">
            <Link to="/dashboard" className="nav-link text-white">
              <i className="fas fa-tachometer-alt me-2"></i>
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/products" className="nav-link text-white">
              <i className="fas fa-box me-2"></i>
              {isOpen && <span>Produtos</span>}
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/movements" className="nav-link text-white">
              <i className="fas fa-exchange-alt me-2"></i>
              {isOpen && <span>Movimentações</span>}
            </Link>
          </li>
        </ul>
        
        <div className="mt-auto">
          <hr className="text-white-50" />
          <Link to="/settings" className="nav-link text-white">
            <i className="fas fa-cog me-2"></i>
            {isOpen && <span>Configurações</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
