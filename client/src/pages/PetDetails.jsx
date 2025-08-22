import { Box, Button, ImageList, ImageListItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/pets/${id}`);
        setPet(data);
      } finally { setLoading(false); }
    };
    load();
  }, [id]);

  const apply = async () => {
    if (!user) return navigate('/login');
    await api.post(`/pets/${id}/apply`);
    alert('Interest submitted — shelter will contact you.');
  };

  if (loading) return <div>Loading...</div>;
  if (!pet) return <div>Pet not found</div>;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 3 }}>
      <ImageList cols={1}>
        {pet.images?.length ? pet.images.map((src, idx) => (
          <ImageListItem key={idx}>
            <img src={src} alt={`${pet.name}-${idx}`} style={{ width: '100%', height: 380, objectFit: 'cover' }} />
          </ImageListItem>
        )) : (
          <ImageListItem>
            <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a" alt="placeholder" style={{ width: '100%', height: 380, objectFit: 'cover' }} />
          </ImageListItem>
        )}
      </ImageList>

      <Box>
        <Typography variant="h4">{pet.name}</Typography>
        <Typography color="text.secondary">{pet.breed || pet.species} • {pet.age} • {pet.gender} • {pet.size}</Typography>
        <Typography sx={{ mt: 2 }}>{pet.description}</Typography>
        {pet.medicalHistory && <Typography sx={{ mt: 1 }} color="text.secondary"><strong>Medical:</strong> {pet.medicalHistory}</Typography>}
        <Typography sx={{ mt: 1 }} color="text.secondary"><strong>Location:</strong> {pet.location}</Typography>

        {!pet.adopted && <Button variant="contained" sx={{ mt: 2 }} onClick={apply}>Adopt / Express Interest</Button>}
      </Box>
    </Box>
  );
}
