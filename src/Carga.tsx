import { useState, useEffect } from "react";

interface Props {
    children: React.ReactNode;
}

function Carga({ children }: Props) {
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCargando(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (cargando) {
        return <h1>Cargando pagina...</h1>;
    }

    return <>{children}</>;
}

export default Carga;