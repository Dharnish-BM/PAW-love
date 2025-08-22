import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ onSearch }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 800 }}>
          PAW<span style={{ color: '#333' }}>-love</span>
        </Typography>

        <Box sx={{ ml: 3, display: 'flex', gap: 2 }}>
          <Button component={Link} to="/browse">Browse</Button>
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <TextField size="small" placeholder="Search name or breed" onChange={(e) => onSearch?.(e.target.value)} sx={{ width: 360 }} />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {!user ? (
            <>
              <Button component={Link} to="/login">Login</Button>
              <Button variant="contained" component={Link} to="/signup">Sign up</Button>
            </>
          ) : (
            <>
              {user.isShelter && <Button component={Link} to="/dashboard">Dashboard</Button>}
              <Button onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
