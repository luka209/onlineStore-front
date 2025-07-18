import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext'; 
import { CartProvider } from './context/CartContext';
import { LikeProvider } from './context/LikeContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AuthProvider>
  <LikeProvider>
    <CartProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </CartProvider>
  </LikeProvider>
</AuthProvider>
);
  
reportWebVitals();
