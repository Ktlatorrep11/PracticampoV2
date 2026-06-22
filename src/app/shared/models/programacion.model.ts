export interface Programacion {
  id: number;
  id_estado: number;
  id_programa_academico: number;
  id_espacio_academico: number;
  id_periodo_academico: number;
  anio_periodo: string;
  id_semestre_asignatura: number;
  num_estudiantes_aprox: number;
  id_docente_responsable: number;
  cantidad_grupos: number;
  grupo_1: string;
  grupo_2: string;
  grupo_3: string;
  grupo_4: string;
  // Ruta principal
  destino_rp: string;
  lugar_salida_rp: string;
  lugar_regreso_rp: string;
  fecha_salida_aprox_rp: string;
  fecha_regreso_aprox_rp: string;
  duracion_num_dias_rp: number;
  ruta_principal: string;
  // Ruta alterna
  destino_ra: string;
  fecha_salida_aprox_ra: string;
  fecha_regreso_aprox_ra: string;
  duracion_num_dias_ra: number;
  ruta_alterna: string;
  // Aprobaciones
  aprobacion_coordinador: number;
  aprobacion_decano: number;
  fecha_diligenciamiento: string;
  observacion_rechazo?: string;
}

export const ESTADOS_PROGRAMACION: { [key: number]: string } = {
  1:  'Borrador',
  2:  'Enviado a coordinador',
  3:  'Aprobado coordinador',
  4:  'Rechazado coordinador',
  5:  'Aprobado decano',
  6:  'Rechazado decano',
  7:  'En ejecución',
  8:  'Cerrado',
  9:  'Legalizado',
  10: 'Cancelado',
};