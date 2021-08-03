import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import IntersectionDemo from "./IntersectionObserver/IntersectionDemo"
import { AuthProvider } from './context/AuthProvider';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
      // <IntersectionDemo></IntersectionDemo>,
  
  document.getElementById('root')
);

