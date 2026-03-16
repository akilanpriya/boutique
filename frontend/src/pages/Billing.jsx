import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Billing = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState({
    order_id: '', advance_paid: '', remaining_amount: '', payment_status: 'unpaid'
  });

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/payments', paymentData);
      alert('Payment recorded successfully!');
      setPaymentData({ order_id: '', advance_paid: '', remaining_amount: '', payment_status: 'unpaid' });
    } catch (error) {
      console.error('Error recording payment:', error);
      alert('Failed to record payment');
    }
  };

  const calculateRemaining = (estimate, advance) => {
    const total = parseFloat(estimate) || 0;
    const paid = parseFloat(advance) || 0;
    return Math.max(0, total - paid).toFixed(2);
  };

  const handleOrderSelect = (e) => {
    const orderId = e.target.value;
    const order = orders.find(o => o.id.toString() === orderId);
    
    if (order) {
      setPaymentData({
        ...paymentData,
        order_id: orderId,
        advance_paid: 0,
        remaining_amount: order.price_estimate,
        payment_status: 'unpaid'
      });
    } else {
      setPaymentData({
        ...paymentData,
        order_id: '',
      });
    }
  };

  const handleAdvanceChange = (e) => {
    const advance = e.target.value;
    const order = orders.find(o => o.id.toString() === paymentData.order_id);
    if (order) {
      const remaining = calculateRemaining(order.price_estimate, advance);
      let status = 'partial';
      if (parseFloat(remaining) <= 0) status = 'paid';
      if (parseFloat(advance) <= 0) status = 'unpaid';
      
      setPaymentData({
        ...paymentData,
        advance_paid: advance,
        remaining_amount: remaining,
        payment_status: status
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Billing & Payments</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-6 border-b border-slate-100 pb-4">Record New Payment</h2>
        
        {loading ? (
          <p className="text-slate-500">Loading orders...</p>
        ) : (
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Select Order</label>
              <select
                value={paymentData.order_id}
                onChange={handleOrderSelect}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="">-- Choose an order to bill --</option>
                {orders.map(o => (
                  <option key={o.id} value={o.id}>
                    Order #{o.id} - {o.customer_name} ({o.dress_type}) - Total: ${o.price_estimate}
                  </option>
                ))}
              </select>
            </div>

            {paymentData.order_id && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-lg border border-slate-100">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Total Estimate</label>
                  <div className="text-xl font-bold text-slate-800">
                    ${orders.find(o => o.id.toString() === paymentData.order_id)?.price_estimate || '0.00'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Amount Paid / Advance</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={paymentData.advance_paid}
                      onChange={handleAdvanceChange}
                      required
                      className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Remaining Balance</label>
                  <div className="text-xl font-bold text-rose-600">
                    ${paymentData.remaining_amount}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={!paymentData.order_id}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
              >
                Record Payment
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Billing;
