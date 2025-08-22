import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PetCard({ pet }) {
  const image = pet.images?.[0] || 'https://images.unsplash.com/photo-1517849845537-4d257902454a';
  return (
    <Card>
      <CardActionArea component={Link} to={`/pets/${pet._id}`}>
        <CardMedia component="img" height="160" image={image} alt={pet.name} />
        <CardContent>
          <Typography variant="h6">{pet.name}</Typography>
          <Typography variant="body2" color="text.secondary">{pet.breed || pet.species} • {pet.age}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
