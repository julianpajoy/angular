import { Component } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {

  //public titulo: string = 'listado de alumnos';

  titulo = 'Listado de alumnos';
  alumnos: Alumno[] | undefined;

  constructor(private service: AlumnoService) {}

  ngOnInit(){
    this.service.listar().subscribe(alumnos => { // Recibe lista de datos
      this.alumnos = alumnos; // Observador
    });
  }

}
