import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Container sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h3" gutterBottom>Find your new best friend with <span style={{ color: '#FF9E44' }}>PAW-love</span> 🐾</Typography>
      <Typography color="text.secondary">Browse pets, apply to adopt, and let shelters manage applications.</Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" component={Link} to="/browse" sx={{ mr: 2 }}>Browse Pets</Button>
        <Button component={Link} to="/signup">Join Now</Button>
      </Box>
    </Container>
  );
}
