import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Asignatura, Estudiante } from "../types/student";

const STORAGE_KEY = "gestor_notas_estudiantes";

type LegacyAsignatura = {
  nombre: string;
  calificacion?: number;
  nota?: number;
  id_asignatura?: string;
};

type LegacyEstudiante = {
  id_estudiante: string | number;
  nombre: string;
  asignaturas?: LegacyAsignatura[];
};

function migrateEstudiantes(parsed: unknown): Estudiante[] {
  if (!Array.isArray(parsed)) return [];

  let changed = false;
  const result: Estudiante[] = (parsed as LegacyEstudiante[]).map((raw) => {
    let id_estudiante: string;
    if (typeof raw.id_estudiante === "number") {
      id_estudiante = crypto.randomUUID();
      changed = true;
    } else {
      id_estudiante = String(raw.id_estudiante);
    }

    const asignaturas: Asignatura[] = (raw.asignaturas ?? []).map((a) => {
      const calificacion =
        typeof a.calificacion === "number"
          ? a.calificacion
          : typeof a.nota === "number"
            ? a.nota
            : Number(a.calificacion ?? a.nota) || 0;
      const id_asignatura = a.id_asignatura ?? crypto.randomUUID();
      if (!a.id_asignatura) changed = true;
      return { id_asignatura, nombre: a.nombre, calificacion };
    });

    return { id_estudiante, nombre: raw.nombre, asignaturas };
  });

  if (changed && typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    } catch {
      /* ignore */
    }
  }

  return result;
}

function persistToStorage(data: Estudiante[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

type StudentsContextValue = {
  estudiantes: Estudiante[];
  addEstudiante: (nombre: string) => Estudiante;
  addAsignatura: (id_estudiante: string, nombre: string, calificacion: number) => void;
  getEstudiante: (id: string | undefined) => Estudiante | undefined;
};

const StudentsContext = createContext<StudentsContextValue | null>(null);

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return migrateEstudiantes(parsed);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    persistToStorage(estudiantes);
  }, [estudiantes]);

  const addEstudiante = useCallback((nombre: string) => {
    const nuevo: Estudiante = {
      id_estudiante: crypto.randomUUID(),
      nombre,
      asignaturas: [],
    };
    setEstudiantes((prev) => {
      const next = [...prev, nuevo];
      persistToStorage(next);
      return next;
    });
    return nuevo;
  }, []);

  const addAsignatura = useCallback((id_estudiante: string, nombre: string, calificacion: number) => {
    const nueva: Asignatura = {
      id_asignatura: crypto.randomUUID(),
      nombre,
      calificacion,
    };
    setEstudiantes((prev) => {
      const next = prev.map((e) =>
        e.id_estudiante === id_estudiante ? { ...e, asignaturas: [...e.asignaturas, nueva] } : e,
      );
      persistToStorage(next);
      return next;
    });
  }, []);

  const getEstudiante = useCallback(
    (id: string | undefined) => {
      if (id == null || id === "") return undefined;
      const normalized = decodeURIComponent(id);
      return estudiantes.find((e) => e.id_estudiante === normalized);
    },
    [estudiantes],
  );

  const value = useMemo(
    () => ({
      estudiantes,
      addEstudiante,
      addAsignatura,
      getEstudiante,
    }),
    [estudiantes, addEstudiante, addAsignatura, getEstudiante],
  );

  return <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>;
}

export function useStudents(): StudentsContextValue {
  const ctx = useContext(StudentsContext);
  if (!ctx) {
    throw new Error("useStudents debe usarse dentro de StudentsProvider");
  }
  return ctx;
}