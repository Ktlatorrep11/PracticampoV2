export interface Usuario {
  id: number;
  usuario: string;
  email: string;
  id_role: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  id_tipo_vinculacion: number;
  id_programa_academico: number;
  id_espacio_academico_1: number;
  id_espacio_academico_2: number;
  id_espacio_academico_3: number;
  id_espacio_academico_4: number;
  id_espacio_academico_5: number;
  id_espacio_academico_6: number;
  id_estado: number;
  telefono: string;
  celular: string;
}

export const ROLES: { [key: number]: string } = {
  1: 'Administrador',
  2: 'Docente',
  3: 'Coordinador',
  4: 'Decano',
  5: 'Asistente de decanatura',
  6: 'Estudiante',
  7: 'Docente coordinador',
  8: 'Invitado',
};