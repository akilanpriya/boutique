import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Billing from './pages/Billing';

function App() {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      {/* Sidebar Navigation */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-1 p-8 ml-64 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/billing" element={<Billing />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
