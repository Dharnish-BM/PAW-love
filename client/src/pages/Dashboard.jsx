import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';

function DashboardInner() {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [apps, setApps] = useState([]);
  const [form, setForm] = useState({ name:'', species:'dog', breed:'', age:'', gender:'unknown', size:'medium', location:'', description:'', medicalHistory:'', imageUrls:'' });

  const load = async () => {
    try {
      const [p, a] = await Promise.all([api.get('/pets/mine/list'), api.get('/pets/owner/applications/list')]);
      setPets(p.data); setApps(a.data);
    } catch (err) { /* ignore */ }
  };
  useEffect(()=>{ load(); },[]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (payload.imageUrls) payload.imageUrls = payload.imageUrls.split(',').map(s=>s.trim());
    await api.post('/pets', payload);
    setForm({ name:'', species:'dog', breed:'', age:'', gender:'unknown', size:'medium', location:'', description:'', medicalHistory:'', imageUrls:'' });
    await load();
  };

  const markAdopted = async (id) => { await api.put(`/pets/${id}`, { adopted: true }); await load(); };
  const setStatus = async (id, status) => { await api.put(`/pets/applications/${id}`, { status }); await load(); };

  if (!user?.isShelter) return <Typography>No access. Must be a shelter user.</Typography>;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
      <Box>
        <Typography variant="h6">Add New Pet</Typography>
        <Box component="form" onSubmit={submit} sx={{ display: 'grid', gap: 1, mt: 2 }}>
          <TextField label="Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
          <Select value={form.species} onChange={(e)=>setForm({...form, species:e.target.value})}>
            <MenuItem value="dog">Dog</MenuItem>
            <MenuItem value="cat">Cat</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          <TextField label="Breed" value={form.breed} onChange={(e)=>setForm({...form, breed:e.target.value})} />
          <TextField label="Age" value={form.age} onChange={(e)=>setForm({...form, age:e.target.value})} />
          <Button variant="contained" type="submit">Add Pet</Button>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6">My Pets</Typography>
        <Box sx={{ mt: 1 }}>
          {pets.map(p => (
            <Box key={p._id} sx={{ p: 1, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
              <div>{p.name} • {p.species} • {p.location} {p.adopted && '(adopted)'}</div>
              {!p.adopted && <Button size="small" onClick={()=>markAdopted(p._id)}>Mark Adopted</Button>}
            </Box>
          ))}
        </Box>

        <Typography variant="h6" sx={{ mt: 2 }}>Applications</Typography>
        <Box sx={{ mt: 1 }}>
          {apps.map(a => (
            <Box key={a._id} sx={{ p: 1, borderBottom: '1px solid #eee' }}>
              <div><strong>{a.pet?.name}</strong> — {a.user?.name} • {a.user?.email}</div>
              <Select value={a.status} onChange={(e)=>setStatus(a._id, e.target.value)} sx={{ mt: 1 }}>
                <MenuItem value="pending">pending</MenuItem>
                <MenuItem value="contacted">contacted</MenuItem>
                <MenuItem value="approved">approved</MenuItem>
                <MenuItem value="rejected">rejected</MenuItem>
              </Select>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute requireShelter>
      <DashboardInner />
    </ProtectedRoute>
  );
}
