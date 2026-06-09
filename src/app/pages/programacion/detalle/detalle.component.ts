import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Programacion, ESTADOS_PROGRAMACION } from '../../../shared/models';
import { ProgramacionService } from '../services/programacion.service';

@Component({
  selector: 'app-detalle-programacion',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  programacion!: Programacion
  estados = ESTADOS_PROGRAMACION;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private programacionService: ProgramacionService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.programacionService.getById(id).subscribe(data => {
      this.programacion = data;
      this.cargando = false;
    });
  }

  getEstado(id: number): string {
    return this.estados[id] || 'Desconocido';
  }

  volver(): void {
    this.router.navigate(['/pages/programaciones']);
  }

  enviarACoordinador(): void {
    console.log('Enviando a coordinador...');
  }

}