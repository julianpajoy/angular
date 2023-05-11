import { Component } from '@angular/core';
import { CommonFormComponent } from '../common-form.component';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent extends CommonFormComponent<Curso, CursoService>{

  /*En el "constructor" se inyectan algunos atributos, por ejemplo:
    el "ruta": para las rutas; el "redirigir": para redirigir
  */
  constructor(servicio: CursoService,
    enrutador: Router, // Redirige al listado completo
    ruta: ActivatedRoute) { 
      super(servicio, enrutador, ruta);
      this.titulo = 'Crear curso';
      this.modelo = new Curso();
      this.redirigir = '/cursos'; // Redirige a cursos
      this.nombreModel = Curso.name;
    }
}
