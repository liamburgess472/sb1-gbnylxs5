import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MealPlannerProvider } from './contexts/MealPlannerContext';
import { ShoppingListProvider } from './contexts/ShoppingListContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <MealPlannerProvider>
          <ShoppingListProvider>
            <App />
          </ShoppingListProvider>
        </MealPlannerProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);