import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Solicitud, ESTADOS_SOLICITUD } from '../../../shared/models';
import { SolicitudService } from '../services/solicitud.service';
import { DialogoRechazoComponent } from '../../programacion/dialogo-rechazo/dialogo-rechazo.component';
import * as XLSX from 'xlsx';
import { AuditoriaService } from '../../../services/auditoria.service';


@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleSolicitudComponent implements OnInit {

  solicitud!: Solicitud;
  estados = ESTADOS_SOLICITUD;
  cargando = true;
  procesando = false;
  subiendoListado = false;
  resultadoImportacion: { exitoso: boolean; mensaje: string } | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitudService: SolicitudService,
    private dialog: MatDialog,
    private auditoriaService: AuditoriaService,
  ) {}


  historial: any[] = [];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.solicitudService.getById(id).subscribe(data => {
      this.solicitud = data;
      this.historial = this.auditoriaService.getHistorial('solicitud', id);
      this.cargando = false;
    });
  }

  getEstado(id: number): string {
    return this.estados[id] || 'Desconocido';
  }

  volver(): void {
    this.router.navigate(['/pages/solicitudes']);
  }

    enviarACoordinador(): void {
    if (!confirm('¿Confirmas enviar esta solicitud al Coordinador? No podrás modificarla mientras esté en revisión.')) return;
    this.procesando = true;
    this.solicitudService.enviarACoordinador(this.solicitud.id).subscribe({
      next: data => {
        this.solicitud = data;
        this.auditoriaService.registrar('solicitud', this.solicitud.id, 'Enviada a Coordinador');
        this.historial = this.auditoriaService.getHistorial('solicitud', this.solicitud.id);
        this.procesando = false;
      },
      error: () => {
        this.procesando = false;
        alert('Ocurrió un error al enviar la solicitud. Por favor intenta de nuevo.');
      }
    });
  }

aprobarCoordinador(): void {
    if (!confirm('¿Confirmas la aprobación de esta solicitud como Coordinador? Esta acción notificará al siguiente responsable en el flujo.')) return;
    this.procesando = true;
    this.solicitudService.aprobarCoordinador(this.solicitud.id).subscribe({
      next: data => {
        this.solicitud = data;
        this.auditoriaService.registrar('solicitud', this.solicitud.id, 'Aprobada por Coordinador');
        this.historial = this.auditoriaService.getHistorial('solicitud', this.solicitud.id);
        this.procesando = false;
      },
      error: () => {
        this.procesando = false;
        alert('Ocurrió un error al aprobar la solicitud. Por favor intenta de nuevo.');
      }
    });
  }

   rechazarCoordinador(): void {
    const dialogRef = this.dialog.open(DialogoRechazoComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(observacion => {
      if (observacion) {
        this.procesando = true;
        this.solicitudService.rechazarCoordinador(this.solicitud.id, observacion).subscribe({
          next: data => {
            this.solicitud = data;
            this.auditoriaService.registrar('solicitud', this.solicitud.id, 'Rechazada por Coordinador', observacion);
            this.historial = this.auditoriaService.getHistorial('solicitud', this.solicitud.id);
            this.procesando = false;
          },
          error: () => {
            this.procesando = false;
            alert('Ocurrió un error al rechazar la solicitud. Por favor intenta de nuevo.');
          }
        });
      }
    });
  }

aprobarDecano(): void {
    if (!confirm('¿Confirmas el visto bueno como Decano? La solicitud quedará aprobada.')) return;
    this.procesando = true;
    this.solicitudService.aprobarDecano(this.solicitud.id).subscribe({
      next: data => {
        this.solicitud = data;
        this.auditoriaService.registrar('solicitud', this.solicitud.id, 'Aprobada por Decano');
        this.historial = this.auditoriaService.getHistorial('solicitud', this.solicitud.id);
        this.procesando = false;
      },
      error: () => {
        this.procesando = false;
        alert('Ocurrió un error al aprobar la solicitud. Por favor intenta de nuevo.');
      }
    });
  }


rechazarDecano(): void {
    const dialogRef = this.dialog.open(DialogoRechazoComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(observacion => {
      if (observacion) {
        this.procesando = true;
        this.solicitudService.rechazarDecano(this.solicitud.id, observacion).subscribe({
          next: data => {
            this.solicitud = data;
            this.auditoriaService.registrar('solicitud', this.solicitud.id, 'Rechazada por Decano', observacion);
            this.historial = this.auditoriaService.getHistorial('solicitud', this.solicitud.id);
            this.procesando = false;
          },
          error: () => {
            this.procesando = false;
            alert('Ocurrió un error al rechazar la solicitud. Por favor intenta de nuevo.');
          }
        });
      }
    });
  }

   cerrar(): void {
    if (!confirm('¿Confirmas cerrar esta solicitud? Esta acción marca la práctica como finalizada y no se puede deshacer.')) return;
    this.procesando = true;
    this.solicitudService.cerrar(this.solicitud.id).subscribe({
      next: data => {
        this.solicitud = data;
        this.auditoriaService.registrar('solicitud', this.solicitud.id, 'Solicitud cerrada');
        this.historial = this.auditoriaService.getHistorial('solicitud', this.solicitud.id);
        this.procesando = false;
      },
      error: () => {
        this.procesando = false;
        alert('Ocurrió un error al cerrar la solicitud. Por favor intenta de nuevo.');
      }
    });
  }


  verEstudiantes(): void {
    this.router.navigate(['/pages/estudiantes', this.solicitud.id]);
  }
 
  verDocumento(tipo: string): void {
    if (tipo === 'resolucion') {
      this.router.navigate(['/pages/solicitudes', this.solicitud.id, 'resolucion']);
    } else {
      alert(`El documento "${tipo}" estará disponible próximamente.`);
    }
  }
  subirListado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const archivo = input.files[0];
    this.subiendoListado = true;
    this.resultadoImportacion = null;

    const lector = new FileReader();
    lector.onload = (e: any) => { 
     console.log('Archivo cargado, iniciando lectura...');
      try {
        const datos = new Uint8Array(e.target.result);
        const libro = XLSX.read(datos, { type: 'array' });
        const hoja = libro.Sheets[libro.SheetNames[0]];
        const filas: any[] = XLSX.utils.sheet_to_json(hoja);

        // Se espera que el Excel tenga una columna llamada "documento" o "cedula"
        const documentos = filas
          .map(f => f.documento || f.cedula || f.Documento || f.Cedula || f['NÚMERO DE DOCUMENTO'])
          .filter(d => !!d);

        if (documentos.length === 0) {
          this.resultadoImportacion = {
            exitoso: false,
            mensaje: 'No se encontraron números de documento en el archivo. Verifica que exista una columna llamada "documento" o "cedula".'
          };
          this.subiendoListado = false;
          input.value = '';
          return;
        }

        this.solicitudService.importarEstudiantesPorDocumento(this.solicitud.id, documentos).subscribe({
          next: (resultado: any) => {
            this.resultadoImportacion = {
              exitoso: true,
              mensaje: `Se importaron ${resultado.inscritos || documentos.length} estudiantes correctamente desde el SGA.`
            };
            this.subiendoListado = false;
            input.value = '';
          },
          error: () => {
            this.resultadoImportacion = {
              exitoso: false,
              mensaje: 'Ocurrió un error al consultar el SGA. Verifica la conexión e intenta de nuevo.'
            };
            this.subiendoListado = false;
            input.value = '';
          }
        });

      } catch (error) {
        this.resultadoImportacion = {
          exitoso: false,
          mensaje: 'El archivo no se pudo leer. Verifica que sea un Excel válido (.xlsx o .xls).'
        };
        this.subiendoListado = false;
        input.value = '';
      }
    };

    lector.readAsArrayBuffer(archivo);
  }

}