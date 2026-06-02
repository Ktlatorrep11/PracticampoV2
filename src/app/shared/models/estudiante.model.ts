export interface Estudiante {
  num_identificacion: string;
  nombre_completo: string;
  email: string;
  grupo: string;
  celular: string;
  eps: string;
  id_solicitud_practica: number;
  // Documentos
  seguro_estudiantil: string;
  documento_identificacion: string;
  certificado_eps: string;
  permiso_acudiente: string;
  vacuna_fiebre_amarilla: string;
  vacuna_tetanos: string;
  certificado_adicional_1: string;
  certificado_adicional_2: string;
  certificado_adicional_3: string;
  detalle_certificado_adicional_1: string;
  detalle_certificado_adicional_2: string;
  detalle_certificado_adicional_3: string;
  habilitado: boolean;
}