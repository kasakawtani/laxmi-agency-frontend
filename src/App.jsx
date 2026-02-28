import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { injectGlobalStyles } from './styles/globalStyles';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Admin from './pages/Admin';
import AdminTable from './pages/AdminTable';
import AdminInquiries from './pages/AdminInquiries';
import Customer from './pages/Customer';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // Inject global styles on component mount
  useEffect(() => {
    injectGlobalStyles();
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* ADMIN (protected) */}
          <Route
            path="/admin/add-item"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-items"
            element={
              <ProtectedRoute>
                <AdminTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inquiries"
            element={
              <ProtectedRoute>
                <AdminInquiries />
              </ProtectedRoute>
            }
          />

          {/* CUSTOMER */}
          <Route path="/customer" element={<Customer />} />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
