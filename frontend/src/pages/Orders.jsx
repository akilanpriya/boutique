import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    customer_id: '',
    dress_type: '',
    material: '',
    trial_date: '',
    delivery_date: '',
    price_estimate: ''
  });

  const fetchData = async () => {
    try {
      const [ordersRes, customersRes] = await Promise.all([
        axios.get('http://localhost:5000/orders'),
        axios.get('http://localhost:5000/customers')
      ]);
      setOrders(ordersRes.data);
      setCustomers(customersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/orders', formData);
      setShowForm(false);
      setFormData({
        customer_id: '', dress_type: '', material: '', trial_date: '', delivery_date: '', price_estimate: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order');
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/orders/${id}`, { status: newStatus });
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': 'bg-slate-100 text-slate-700 border-slate-200',
      'in_progress': 'bg-blue-100 text-blue-700 border-blue-200',
      'ready_for_trial': 'bg-amber-100 text-amber-700 border-amber-200',
      'completed': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'delivered': 'bg-emerald-100 text-emerald-700 border-emerald-200'
    };
    const format = status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusMap[status]}`}>
        {format}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Orders</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
        >
          {showForm ? 'Cancel' : 'Create New Order'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4">New Order Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Customer</label>
              <select
                name="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="">Select a customer</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name} - {c.phone}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Dress Type</label>
              <input
                type="text"
                name="dress_type"
                value={formData.dress_type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="e.g., Blouse, Salwar, Gown"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Material Details</label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="Client provided, Silk, Cotton..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Trial Date (Optional)</label>
              <input
                type="date"
                name="trial_date"
                value={formData.trial_date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Delivery Date (Optional)</label>
              <input
                type="date"
                name="delivery_date"
                value={formData.delivery_date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Price Estimate ($)</label>
              <input
                type="number"
                step="0.01"
                name="price_estimate"
                value={formData.price_estimate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Save Order
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-semibold text-slate-800">Recent Orders</h3>
        </div>
        <div className="p-0 overflow-x-auto">
          {loading ? (
            <div className="text-center py-8 text-slate-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8 text-slate-500">No orders found. Create your first order above.</div>
          ) : (
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="bg-white border-b border-slate-100">
                  <th className="py-4 px-6 font-medium text-slate-500">Order ID</th>
                  <th className="py-4 px-6 font-medium text-slate-500">Customer</th>
                  <th className="py-4 px-6 font-medium text-slate-500">Dress</th>
                  <th className="py-4 px-6 font-medium text-slate-500">Delivery</th>
                  <th className="py-4 px-6 font-medium text-slate-500">Price</th>
                  <th className="py-4 px-6 font-medium text-slate-500">Status</th>
                  <th className="py-4 px-6 font-medium text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-slate-800">#{o.id}</td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-800">{o.customer_name}</div>
                      <div className="text-xs text-slate-500">{o.customer_phone}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-700">{o.dress_type}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">
                      {o.delivery_date ? new Date(o.delivery_date).toLocaleDateString() : 'TBD'}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-800">${o.price_estimate}</td>
                    <td className="py-4 px-6">{getStatusBadge(o.status)}</td>
                    <td className="py-4 px-6 text-right">
                      <select 
                        value={o.status}
                        onChange={(e) => updateStatus(o.id, e.target.value)}
                        className="text-sm bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none focus:border-indigo-400"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="ready_for_trial">Ready for Trial</option>
                        <option value="completed">Completed</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
