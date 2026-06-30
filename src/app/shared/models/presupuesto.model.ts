export interface Presupuesto {
  id: number;
  id_programacion_practica: number;
  id_programa_academico: number;
  valor_total_asignado: number;
  valor_total_ejecutado: number;
  anio: string;
}

export interface ViaticoCalculado {
  id_programacion_practica: number;
  num_dias: number;
  num_personas: number;
  valor_dia_persona: number;
  valor_total: number;
  tipo: 'docente' | 'estudiante';
}