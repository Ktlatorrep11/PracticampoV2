import { Component, OnInit } from '@angular/core';
import { Programacion, ESTADOS_PROGRAMACION } from '../../../shared/models';
import { ProgramacionService } from '../services/programacion.service';

@Component({
  selector: 'app-listado-programacion',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  programaciones: Programacion[] = [];
  estados = ESTADOS_PROGRAMACION;
  cargando = true;

  constructor(private programacionService: ProgramacionService) {}

  ngOnInit(): void {
    this.programacionService.getAll().subscribe(data => {
      this.programaciones = data;
      this.cargando = false;
    });
  }

  getEstado(id: number): string {
    return this.estados[id] || 'Desconocido';
  }

}