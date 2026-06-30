import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-presupuesto',
  templateUrl: './dialogo-presupuesto.component.html',
})
export class DialogoPresupuestoComponent {

  valor: number = 0;

  constructor(public dialogRef: MatDialogRef<DialogoPresupuestoComponent>) {}

  confirmar(): void {
    if (this.valor > 0) {
      this.dialogRef.close(this.valor);
    }
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }

}