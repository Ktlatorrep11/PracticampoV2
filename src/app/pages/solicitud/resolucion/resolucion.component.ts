
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Fila {
  id: number;
  asignatura: string;
  docentes: string;
  sitio: string;
  fecha: string;
  dias: number;
  numDocentes: number;
  numEstudiantes: number;
}

interface Parrafo {
  id: number;
  texto: string;
  rotulo?: string;
}

@Component({
  selector: 'app-resolucion',
  templateUrl: './resolucion.component.html',
  styleUrls: ['./resolucion.component.scss']
})
export class ResolucionComponent implements OnInit {

  panel: string = 'datos';
  private contadorId = 1;

  tokens = [
    { token: '{{docente}}', descripcion: 'Nombre del docente responsable' },
    { token: '{{proyecto}}', descripcion: 'Proyecto curricular' },
    { token: '{{acta}}', descripcion: 'Número de acta del Consejo' },
    { token: '{{fechaActa}}', descripcion: 'Fecha del acta del Consejo' },
    { token: '{{cdp}}', descripcion: 'Disponibilidad presupuestal' },
  ];

  considerandosDefecto: Parrafo[] = [
    { id: 1, texto: 'Que el docente {{docente}}, adscrito al proyecto curricular {{proyecto}}, radicó solicitud de práctica académica de campo conforme al proceso GD-PR-010.' },
    { id: 2, texto: 'Que el Consejo Curricular avaló la pertinencia académica de la solicitud y remitió el aval al Consejo de Facultad.' },
    { id: 3, texto: 'Que el Consejo de Facultad, en sesión del {{fechaActa}} según Acta {{acta}}, aprobó la realización de la práctica académica de campo.' },
    { id: 4, texto: 'Que se cuenta con disponibilidad presupuestal {{cdp}} para cubrir los viáticos y auxilios correspondientes.' },
  ];

  articulosDefecto: Parrafo[] = [
    { id: 1, rotulo: 'ARTÍCULO PRIMERO.', texto: 'Autorizar el avance de recursos al docente {{docente}} para el desarrollo de la práctica académica de campo relacionada en el cuadro anterior, correspondiente a:' },
    { id: 2, rotulo: 'ARTÍCULO SEGUNDO.', texto: 'El docente responsable deberá legalizar los recursos entregados dentro de los quince (15) días hábiles siguientes a la finalización de la práctica académica.' },
    { id: 3, rotulo: 'ARTÍCULO TERCERO.', texto: 'La presente resolución rige a partir de la fecha de su expedición.' },
  ];

  resolucion: any = {
    numero: '',
    anio: new Date().getFullYear(),
    docente: '',
    cedula: '',
    proyectoCurricular: '',
    disponibilidadPresupuestal: '',
    fechaActaConsejo: '',
    numeroActa: '',
    parametros: {
      viaticoDia: 198600,
      auxilioUnDia: 70000,
      auxilioMasDias: 105000,
    },
    filas: [],
    considerandos: [],
    articulos: [],
    vinetasArticuloPrimero: [],
    diaExpedicion: '',
    diaExpedicionLetras: '',
    mesExpedicion: '',
    decana: '',
    revisoNombre: '',
    revisoCargo: 'Coordinador(a) de Proyecto Curricular',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.resolucion.considerandos = this.considerandosDefecto.map(c => ({ ...c }));
    this.resolucion.articulos = this.articulosDefecto.map(a => ({ ...a }));
    this.agregarFila();

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.resolucion.numero = String(id).padStart(3, '0');
      const hoy = new Date();
      const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      this.resolucion.diaExpedicion = String(hoy.getDate());
      this.resolucion.mesExpedicion = meses[hoy.getMonth()];
    }
  }

  // ---------- Cálculos ----------
  viaticoFila(fila: Fila): number {
    if (fila.dias <= 1) return 0;
    return (fila.dias - 0.5) * this.resolucion.parametros.viaticoDia * fila.numDocentes;
  }

  auxilioFila(fila: Fila): number {
    if (fila.dias === 1) return this.resolucion.parametros.auxilioUnDia * fila.numEstudiantes;
    if (fila.dias > 1) return this.resolucion.parametros.auxilioMasDias * fila.numEstudiantes * fila.dias;
    return 0;
  }

  totalFila(fila: Fila): number {
    return this.viaticoFila(fila) + this.auxilioFila(fila);
  }

  get totalGeneral(): number {
    return this.resolucion.filas.reduce((sum: number, f: Fila) => sum + this.totalFila(f), 0);
  }

  moneda(valor: number): string {
    return '$' + Math.round(valor || 0).toLocaleString('es-CO');
  }

  textoAuxilio(fila: Fila): string {
    return `${fila.numEstudiantes} est. x ${this.moneda(this.auxilioFila(fila) / (fila.numEstudiantes || 1))}`;
  }

  // ---------- Filas ----------
  agregarFila(): void {
    this.resolucion.filas.push({
      id: this.contadorId++,
      asignatura: '',
      docentes: '',
      sitio: '',
      fecha: '',
      dias: 1,
      numDocentes: 1,
      numEstudiantes: 0,
    });
  }

  eliminarFila(index: number): void {
    if (this.resolucion.filas.length > 1) {
      this.resolucion.filas.splice(index, 1);
    }
  }
   // ---------- Considerandos ----------
  agregarConsiderando(): void {
    this.resolucion.considerandos.push({ id: this.contadorId++, texto: '' });
  }

  restaurarConsiderandos(): void {
    this.resolucion.considerandos = this.considerandosDefecto.map(c => ({ ...c }));
  }

  restaurarArticulos(): void {
    this.resolucion.articulos = this.articulosDefecto.map(a => ({ ...a }));
  }

  // ---------- Manejo genérico de párrafos (considerandos y artículos) ----------
  subirParrafo(lista: Parrafo[], index: number): void {
    if (index > 0) {
      [lista[index - 1], lista[index]] = [lista[index], lista[index - 1]];
    }
  }

  bajarParrafo(lista: Parrafo[], index: number): void {
    if (index < lista.length - 1) {
      [lista[index + 1], lista[index]] = [lista[index], lista[index + 1]];
    }
  }

  eliminarParrafo(lista: Parrafo[], index: number): void {
    lista.splice(index, 1);
  }

  trackPorId(index: number, item: Parrafo): number {
    return item.id;
  }

  // ---------- Tokens ----------
  insertarToken(parrafo: Parrafo, token: string): void {
    parrafo.texto = (parrafo.texto || '') + ' ' + token;
  }

  interpolar(texto: string): string {
    if (!texto) return '';
    return texto
      .replace(/{{docente}}/g, this.resolucion.docente || '____________')
      .replace(/{{proyecto}}/g, this.resolucion.proyectoCurricular || '____________')
      .replace(/{{acta}}/g, this.resolucion.numeroActa || '___')
      .replace(/{{fechaActa}}/g, this.resolucion.fechaActaConsejo || '____________')
      .replace(/{{cdp}}/g, this.resolucion.disponibilidadPresupuestal || '____________');
  }

  // ---------- Acciones ----------
  imprimir(): void {
    window.print();
  }

  volver(): void {
    this.router.navigate(['/pages/solicitudes']);
  }

}