import { Component } from '@angular/core';
import { CommonListarComponent } from '../common-listar.component';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})

export class CursosComponent 
extends CommonListarComponent<Curso, CursoService> {

  // constructor(@Inject('service') protected service: S) {}
  constructor(service: CursoService) {
    
    super(service);
    this.titulo = 'Listado de cursos';
    this.nombreModel = Curso.name; 
  }

}
