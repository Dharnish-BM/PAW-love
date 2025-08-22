import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import BrowsePets from './pages/BrowsePets.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import PetDetails from './pages/PetDetails.jsx';
import Signup from './pages/Signup.jsx';

export default function App() {
  const [query, setQuery] = useState('');
  return (
    <div>
      <Header onSearch={setQuery} />
      <main style={{ maxWidth: 1200, margin: '24px auto', padding: '0 16px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowsePets globalQuery={query} />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
