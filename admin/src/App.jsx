import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './context/SocketContext';

import AdminLayout from './components/Layout/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Projects from './pages/Projects';
import Inquiries from './pages/Inquiries';
import Careers from './pages/Careers';
import CareerApplications from './pages/CareerApplications';
import TeamMembers from './pages/TeamMembers';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
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
              <Route path="careers" element={<Careers />} />
              <Route path="career-applications" element={<CareerApplications />} />
              <Route path="team-members" element={<TeamMembers />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* FALLBACK */}
            <Route
              path="*"
              element={<Navigate to="/login" replace />}
            />
          </Routes>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;