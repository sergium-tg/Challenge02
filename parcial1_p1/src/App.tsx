import { useState, useEffect } from 'react';
import type { Usuario } from './types';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('medicare_user');
    if (savedUser) {
      setUsuario(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (user: Usuario) => {
    setUsuario(user);
    localStorage.setItem('medicare_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    localStorage.removeItem('medicare_user');
    setUsuario(null);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4', padding: '20px', fontFamily: 'Arial' }}>
      {!usuario ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <Dashboard usuario={usuario} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;