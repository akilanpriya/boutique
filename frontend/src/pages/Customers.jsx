import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from '../components/CustomerForm';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCustomerAdded = (newCustomer) => {
    setCustomers([newCustomer, ...customers]);
    fetchCustomers(); // Refresh to ensure proper ID and ordering if backend alters it
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Customers</h1>
      </div>

      <CustomerForm onCustomerAdded={handleCustomerAdded} />

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-semibold text-slate-800">Customer Directory</h3>
        </div>
        <div className="p-0">
          {loading ? (
            <div className="text-center py-8 text-slate-500">Loading customers...</div>
          ) : customers.length === 0 ? (
            <div className="text-center py-8 text-slate-500">No customers found. Add your first customer above.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-slate-100">
                  <th className="py-4 px-6 font-medium text-slate-500">ID</th>
                  <th className="py-4 px-6 font-medium text-slate-500">Name</th>
                  <th className="py-4 px-6 font-medium text-slate-500">Phone</th>
                  <th className="py-4 px-6 font-medium text-slate-500">Address</th>
                  <th className="py-4 px-6 font-medium text-slate-500 text-right">Added On</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 text-sm text-slate-500">#{c.id}</td>
                    <td className="py-4 px-6 font-medium text-slate-800">{c.name}</td>
                    <td className="py-4 px-6 text-slate-600">{c.phone}</td>
                    <td className="py-4 px-6 text-sm text-slate-600 max-w-xs truncate">{c.address || '-'}</td>
                    <td className="py-4 px-6 text-sm text-slate-500 text-right">
                      {new Date(c.created_at).toLocaleDateString()}
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

export default Customers;
