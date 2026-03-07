import type { Usuario } from '../types';

export default function PerfilUsuario({ usuario }: { usuario: Usuario }) {
  const iniciales = usuario.nombre.charAt(0).toUpperCase();

  const estiloCirculo: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'blue',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  };

  return (
    <div>
      {usuario.avatar ? (
        <img src={usuario.avatar} alt="Avatar" style={{ borderRadius: '50%', width: '40px' }} />
      ) : (
        <div style={estiloCirculo}>{iniciales}</div>
      )}
      <span>{usuario.nombre}</span>
    </div>
  );
}