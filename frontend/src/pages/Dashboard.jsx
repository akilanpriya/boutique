import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, ShoppingBag, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    // In a real app we'd fetch actual stats, here we'll just fetch raw counts
    const fetchStats = async () => {
      try {
        const [customersRes, ordersRes] = await Promise.all([
          axios.get('http://localhost:5000/customers'),
          axios.get('http://localhost:5000/orders')
        ]);
        
        setStats({
          totalCustomers: customersRes.data.length,
          totalOrders: ordersRes.data.length,
          pendingOrders: ordersRes.data.filter(o => o.status !== 'completed' && o.status !== 'delivered').length
        });
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Customers</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.totalCustomers}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-start gap-4">
          <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Orders</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.totalOrders}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-start gap-4">
          <div className="bg-amber-100 p-3 rounded-lg text-amber-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pending Orders</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.pendingOrders}</h3>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Welcome back, Admin!</h2>
        <p className="text-slate-600 leading-relaxed">
          Here you can manage all aspects of your boutique. Use the sidebar to navigate to:
        </p>
        <ul className="list-disc list-inside mt-4 text-slate-600 space-y-2 ml-2">
          <li><strong className="text-slate-800">Customers:</strong> Add new customers and view existing customer details and measurements.</li>
          <li><strong className="text-slate-800">Orders:</strong> Create new tailoring orders, set delivery dates, and track order status.</li>
          <li><strong className="text-slate-800">Billing:</strong> Record advance payments and manage pending balances for completed orders.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
