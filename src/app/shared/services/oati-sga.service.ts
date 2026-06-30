import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DatosSGA {
  num_identificacion: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  telefono: string;
  celular: string;
  cargo: string;
  facultad: string;
  tipo_vinculacion: string;
}

export interface EstudianteSGA {
  codigo: string;
  num_identificacion: string;
  nombre_completo: string;
  email: string;
  programa: string;
  matricula_activa: boolean;
}

const MOCK_FUNCIONARIOS: DatosSGA[] = [
  {
    num_identificacion: '80123456',
    primer_nombre: 'Juan',
    segundo_nombre: 'Carlos',
    primer_apellido: 'Pérez',
    segundo_apellido: 'Gómez',
    email: 'jcperezg@udistrital.edu.co',
    telefono: '6012345678',
    celular: '3001234567',
    cargo: 'Docente',
    facultad: 'FAMARENA',
    tipo_vinculacion: 'Planta',
  },
  {
    num_identificacion: '52987654',
    primer_nombre: 'María',
    segundo_nombre: 'Isabel',
    primer_apellido: 'Rodríguez',
    segundo_apellido: 'Torres',
    email: 'mirodriguezt@udistrital.edu.co',
    telefono: '6019876543',
    celular: '3109876543',
    cargo: 'Coordinadora de Proyecto Curricular',
    facultad: 'FAMARENA',
    tipo_vinculacion: 'Planta',
  },
  {
    num_identificacion: '79654321',
    primer_nombre: 'Carlos',
    segundo_nombre: 'Alberto',
    primer_apellido: 'González',
    segundo_apellido: 'Mora',
    email: 'cagonzalezm@udistrital.edu.co',
    telefono: '6011234567',
    celular: '3201234567',
    cargo: 'Decano',
    facultad: 'FAMARENA',
    tipo_vinculacion: 'Planta',
  },
];

const MOCK_ESTUDIANTES_SGA: EstudianteSGA[] = [
  {
    codigo: '20191025034',
    num_identificacion: '1020123456',
    nombre_completo: 'Carlos Andrés Mora López',
    email: 'camoral@correo.udistrital.edu.co',
    programa: 'Ingeniería Forestal',
    matricula_activa: true,
  },
  {
    codigo: '20201025089',
    num_identificacion: '1020987654',
    nombre_completo: 'Laura Valentina Torres García',
    email: 'lvtorresg@correo.udistrital.edu.co',
    programa: 'Administración Ambiental',
    matricula_activa: true,
  },
];

@Injectable({
  providedIn: 'root'
})
export class OatiSGAService {

  constructor(private http: HttpClient) {}

  getFuncionario(cedula: string): Observable<DatosSGA | null> {
    if (environment.useMocks) {
      const funcionario = MOCK_FUNCIONARIOS.find(f => f.num_identificacion === cedula);
      return of(funcionario || null);
    }
    return this.http.get<DatosSGA>(`${environment.TERCEROS_SERVICE}tercero?query=NumeroDocumento:${cedula}`);
  }

  getEstudiante(codigo: string): Observable<EstudianteSGA | null> {
    if (environment.useMocks) {
      const estudiante = MOCK_ESTUDIANTES_SGA.find(e => e.codigo === codigo || e.num_identificacion === codigo);
      return of(estudiante || null);
    }
    return this.http.get<EstudianteSGA>(`${environment.TERCEROS_SERVICE}estudiante?query=Codigo:${codigo}`);
  }

}