import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import PetCard from '../components/PetCard';

export default function BrowsePets({ globalQuery = '' }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ species: '', gender: '', size: '' });
  const [q, setQ] = useState('');

  const load = async () => {
    setLoading(true);
    const params = { q: globalQuery || q, ...filters };
    const { data } = await api.get('/pets', { params });
    setPets(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, [globalQuery, filters]);

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Species</InputLabel>
          <Select value={filters.species} label="Species" onChange={(e) => setFilters(f => ({ ...f, species: e.target.value }))}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="dog">Dog</MenuItem>
            <MenuItem value="cat">Cat</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Gender</InputLabel>
          <Select value={filters.gender} label="Gender" onChange={(e) => setFilters(f => ({ ...f, gender: e.target.value }))}>
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="unknown">Unknown</MenuItem>
          </Select>
        </FormControl>
        <TextField placeholder="Search name or breed" value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === 'Enter' && load()} />
        <Button variant="outlined" onClick={load}>Search</Button>
      </Box>

      {loading ? <div>Loading...</div> : (
        <Grid container spacing={2}>
          {pets.map(p => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p._id}>
              <PetCard pet={p} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
