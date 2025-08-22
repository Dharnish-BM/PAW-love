import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireShelter = false }) {
  const { user, loading } = useAuth();
  if (loading) return <Box sx={{ p: 4, textAlign: 'center' }}><CircularProgress /></Box>;
  if (!user) return <Navigate to="/login" replace />;
  if (requireShelter && !user.isShelter) return <Navigate to="/" replace />;
  return children;
}
