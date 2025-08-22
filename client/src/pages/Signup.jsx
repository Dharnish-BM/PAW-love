import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'', phone:'', address:'', registerAsShelter:false });
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setOk('');
    if (form.password !== form.confirm) return setError('Passwords do not match');
    try {
      await signup({
        name: form.name, email: form.email, password: form.password,
        phone: form.phone, address: form.address, registerAsShelter: form.registerAsShelter
      });
      setOk('Signup successful. Please login.');
      setTimeout(()=>navigate('/login'), 600);
    } catch (err) { setError(err?.response?.data?.message || 'Signup failed'); }
  };

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Create account</Typography>
      <Box component="form" onSubmit={submit} sx={{ display: 'grid', gap: 2 }}>
        <TextField label="Full name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
        <TextField label="Email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
        <TextField label="Phone" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
        <TextField label="Address" value={form.address} onChange={(e)=>setForm({...form, address:e.target.value})} />
        <TextField label="Password" type="password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} />
        <TextField label="Confirm password" type="password" value={form.confirm} onChange={(e)=>setForm({...form, confirm:e.target.value})} />
        <FormControlLabel control={<Checkbox checked={form.registerAsShelter} onChange={(e)=>setForm({...form, registerAsShelter:e.target.checked})} />} label="Register as a Shelter/Rescue (requires manual verification)" />
        {error && <Typography color="error">{error}</Typography>}
        {ok && <Typography color="success.main">{ok}</Typography>}
        <Button variant="contained" type="submit">Sign up</Button>
      </Box>
    </Box>
  );
}
