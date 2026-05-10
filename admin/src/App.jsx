import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import AdminLayout from './components/Layout/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Projects from './pages/Projects';
import Inquiries from './pages/Inquiries';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* PUBLIC LOGIN ROUTE */}
          <Route path="/login" element={<Login />} />

          {/* PROTECTED ADMIN ROUTES */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* DEFAULT ROUTE */}
            <Route
              index
              element={<Navigate to="dashboard" replace />}
            />

            {/* CHILD ROUTES */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="projects" element={<Projects />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* FALLBACK */}
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;