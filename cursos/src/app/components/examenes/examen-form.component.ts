import { Component } from '@angular/core';
import { CommonFormComponent } from '../common-form.component';
import { Examen } from 'src/app/models/examen';
import { ExamenService } from 'src/app/services/examen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from 'src/app/models/asignatura';
import { Pregunta } from 'src/app/models/pregunta';

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.component.html',
  styleUrls: ['./examen-form.component.css']
})
export class ExamenFormComponent extends CommonFormComponent<Examen, ExamenService>{

  asignaturaPadre: Asignatura[] = [];
  asignaturaHija: Asignatura[] = [];

  constructor(servicio: ExamenService,
    enrutador: Router,
    ruta: ActivatedRoute) {

      super(servicio, enrutador, ruta)
      this.titulo = 'Crear exámen';
      this.redirigir = '/examenes';
      this.nombreModel = Examen.name;
      this.modelo = new Examen();
    }

    override ngOnInit() {
      this.ruta.paramMap.subscribe(parametros => {
        const id: number = +parametros.get('id');
        if (id) {
          this.servicio.ver(id).subscribe(modelo => {
            this.modelo = modelo;
            this.titulo = 'Editar ' + this.nombreModel;

            this.cargarHijos();
            /* Este codigo realiza la consulta en el backend
            this.servicio.buscarTodasAsignaturas().subscribe(asign => 
               this.asignaturaHija = asign
               .filter(a => a.padre && a.padre.id === this.modelo.asignaturaPadre.id ));*/
          });
        }
      }
      );

      this.servicio.buscarTodasAsignaturas()
      .subscribe(
        asignaturas => this.asignaturaPadre = asignaturas.filter(a => !a.padre)
      );
    }

    public cargarHijos(): void {
      /*
      Se valida que «asignaturaPadre» se haya poblado y se hace con el signo 
      interrogacion (?)
      */
      this.asignaturaHija = this.modelo.asignaturaPadre 
        ? // Es como un If
          this.modelo.asignaturaPadre.hijos 
        : // Es como un Else
          []; // Arreglo vacio
    }

    public compararAsignatura(asign1: Asignatura, asign2: Asignatura): boolean{

      // Se asegura de que si ambos estan indefinidos devuelva un true para no causar un error
      if(asign1 === undefined && asign2 === undefined){
        return true;
      }

      /*
      Se valida estos porque es posible que mientras trae los datos del backend hayan un error
      estar indefinido.

      if(asign1 === null || asign2 === null || asign1 === undefined || asign1 === undefined){
        return false;
      }

      if(asign1.id === asign2.id){
        return true;
      }*/

      return (asign1 === null || asign2 === null || asign1 === undefined || asign1 === undefined)
      ?
        false
      :
        (asign1.id === asign2.id);

    }

    public agregarPregunta(): void{
      // Metodo «push» es para agregar preguntas
      this.modelo.preguntas.push(new Pregunta());
    }

    public asignarTexto(pregunta: Pregunta, event: any): void{

      // «event» contiene el texto que escribimos en el input
      pregunta.texto = event.target.value;
      console.log(this.modelo);
    }

    eliminarPregunta(pregunta): void{
      this.modelo.preguntas = this.modelo.preguntas.filter(p => 
        pregunta.texto !== p.texto);
    }
}
