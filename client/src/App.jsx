import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import BrowsePets from './pages/BrowsePets.jsx';
import Community from './pages/Community.jsx';
import Contact from './pages/Contact.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import MyApplications from './pages/MyApplications.jsx';
import PetDetails from './pages/PetDetails.jsx';
import Signup from './pages/Signup.jsx';

export default function App() {
  const [query, setQuery] = useState('');
  return (
    <div className="app">
      <Header onSearch={setQuery} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowsePets globalQuery={query} />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
