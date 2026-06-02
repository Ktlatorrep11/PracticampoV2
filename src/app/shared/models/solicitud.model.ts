export interface Solicitud {
  id: number;
  id_programacion_practica: number;
  id_estado: number;
  consec_dfamarena: string;
  consec_cordis: string;
  fecha_diligenciamiento: string;
}

export const ESTADOS_SOLICITUD: { [key: number]: string } = {
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
  11: 'Práctica realizada',
  12: 'Encuesta transporte diligenciada',
};