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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ListadoComponent } from './listado/listado.component';
import { CrearComponent } from './crear/crear.component';
import { DetalleComponent } from './detalle/detalle.component';
import { DialogoRechazoComponent } from './dialogo-rechazo/dialogo-rechazo.component';
import { DialogoPresupuestoComponent } from './dialogo-presupuesto/dialogo-presupuesto.component';
import { DialogoEjecucionComponent } from './dialogo-ejecucion/dialogo-ejecucion.component';

const routes: Routes = [
  { path: '', component: ListadoComponent },
  { path: 'crear', component: CrearComponent },
  { path: ':id', component: DetalleComponent },
];

@NgModule({
  declarations: [
    ListadoComponent,
    CrearComponent,
    DetalleComponent,
    DialogoRechazoComponent,
    DialogoPresupuestoComponent,
    DialogoEjecucionComponent,
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
    MatSlideToggleModule,
  ]
})
export class ProgramacionModule { }