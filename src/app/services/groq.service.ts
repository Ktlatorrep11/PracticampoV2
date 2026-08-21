import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroqService {

  generarTextosPractica(materia: string, destino: string, diasDuracion: number): Observable<any> {
    // SIMULACIÓN PARA DEMO — la integración real requiere pasar por el backend Beego
    // para evitar exponer la API key en el navegador (restricción CORS de Groq)
    const respuestaSimulada = {
      choices: [{
        message: {
          content: JSON.stringify({
            justificacion: `La práctica académica de campo en ${destino || 'el destino seleccionado'} tiene como propósito fortalecer los conocimientos teóricos adquiridos en el espacio académico, mediante la observación directa y el análisis in situ de las condiciones propias del entorno. Esta salida permite a los estudiantes desarrollar competencias prácticas fundamentales para su formación profesional, contrastando la teoría con la realidad del contexto ambiental estudiado.`,
            objetivo_general: `Fortalecer los conocimientos teórico-prácticos de los estudiantes mediante el reconocimiento directo de las condiciones ambientales y ecológicas presentes en ${destino || 'la zona de estudio'}.`,
            metodologia: `La metodología de trabajo se desarrollará mediante observación directa en campo, toma de datos y muestras, registro fotográfico y elaboración de bitácora de campo. Los estudiantes trabajarán en grupos bajo la supervisión del docente responsable, aplicando los protocolos de bioseguridad y las técnicas propias de la disciplina durante los ${diasDuracion || 1} día(s) de duración de la práctica.`
          })
        }
      }]
    };

    return of(respuestaSimulada).pipe(delay(1500));
  }
}
