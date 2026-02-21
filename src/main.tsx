import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Carga from './Carga'
import Contactos, { type Contacto } from './Contactos'

const misContactos: Contacto[] = [
  { id: 1, nombre: "Nando Rodriguez", telefono: "3331234567" },
  { id: 2, nombre: "Fer Morales", telefono: "3007654321" }
];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Carga>
        <Contactos initialContactos={misContactos} />
    </Carga>
  </StrictMode>,
)