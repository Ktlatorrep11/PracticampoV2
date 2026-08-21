import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RolService, RolUsuario } from '../../services/rol.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  modo: 'usuario' | 'estudiante' | null = null;
  cargando = false;

  usuario = '';
  contrasena = '';
  correoEstudiante = '';
  codigoEstudiante = '';

  constructor(
    private router: Router,
    private rolService: RolService,
  ) {}

  seleccionarModo(modo: 'usuario' | 'estudiante'): void {
    this.modo = modo;
  }

  volver(): void {
    this.modo = null;
    this.usuario = '';
    this.contrasena = '';
    this.correoEstudiante = '';
    this.codigoEstudiante = '';
  }

  acceder(): void {
    this.cargando = true;
    setTimeout(() => {
      if (this.modo === 'usuario') {
        this.rolService.establecerRol('docente', this.usuario || 'Usuario institucional');
      } else {
        this.rolService.establecerRol(null, this.correoEstudiante || 'Estudiante');
      }
      this.router.navigate(['/pages/dashboard']);
    }, 500);
  }

}
