import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ListadoSolicitudComponent } from './listado/listado.component';
import { DetalleSolicitudComponent } from './detalle/detalle.component';
import { CrearSolicitudComponent } from './crear/crear.component';
import { ResolucionComponent } from './resolucion/resolucion.component';

const routes: Routes = [
  { path: '', component: ListadoSolicitudComponent },
  { path: 'crear', component: CrearSolicitudComponent },
  { path: ':id/resolucion', component: ResolucionComponent },
  { path: ':id', component: DetalleSolicitudComponent },
];

@NgModule({
    declarations: [
    ListadoSolicitudComponent,
    DetalleSolicitudComponent,
    CrearSolicitudComponent,
    ResolucionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
  ]
})
export class SolicitudModule { }