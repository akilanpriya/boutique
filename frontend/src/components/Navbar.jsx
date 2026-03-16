import React from 'react';
import { NavLink } from 'react-router-dom';
import { Scissors, Users, ShoppingBag, CreditCard, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const links = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Customers', path: '/customers', icon: <Users size={20} /> },
    { name: 'Orders', path: '/orders', icon: <ShoppingBag size={20} /> },
    { name: 'Billing', path: '/billing', icon: <CreditCard size={20} /> },
  ];

  return (
    <nav className="w-64 bg-slate-900 text-white fixed h-full shadow-xl">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="bg-indigo-500 p-2 rounded-lg text-white">
          <Scissors size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Boutique Admin</h1>
      </div>
      
      <div className="p-4 mt-6 flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {link.icon}
            <span className="font-medium">{link.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
