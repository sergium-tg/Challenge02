import { useState } from 'react';
import type { Usuario } from '../types';

const USERS: Usuario[] = [
  { email: 'admin@medicare.com', pass: '123', rol: 'recepcionista', nombre: 'Admin' },
  { email: 'medico@medicare.com', pass: '123', rol: 'medico', nombre: 'Médico' }
];

export default function LoginForm({ onLogin }: { onLogin: (u: Usuario) => void }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const entrar = (e: React.FormEvent) => {
    e.preventDefault();
    const found = USERS.find(u => u.email === email && u.pass === pass);
    if (found) onLogin(found);
    else setError('Usuario o contraseña incorrectos');
  };

  return (
    <form onSubmit={entrar}>
      <h2>Bienvenido a Medicare</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Pass" onChange={e => setPass(e.target.value)} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Entrar</button>
    </form>
  );
}