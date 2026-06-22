import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, ROLES } from '../../../shared/models';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  roles = ROLES;
  cargando = true;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.usuarioService.getAll().subscribe(data => {
      this.usuarios = data;
      this.cargando = false;
    });
  }

  getRol(id: number): string {
    return this.roles[id] || 'Desconocido';
  }

  getNombre(u: Usuario): string {
    return `${u.primer_nombre} ${u.primer_apellido}`;
  }

  nuevo(): void {
    this.router.navigate(['/pages/usuarios/crear']);
  }

  editar(id: number): void {
    this.router.navigate(['/pages/usuarios', id]);
  }

}