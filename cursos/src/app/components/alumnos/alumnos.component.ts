import { Component, ViewChild } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CommonListarComponent } from '../common-listar.component';
// import { BASE_ENDPOINT } from 'src/app/config/app'; Es valido
import { BASE_ENDPOINT } from '../../config/app';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})

export class AlumnosComponent 
extends CommonListarComponent<Alumno, AlumnoService>{

  //override titulo = 'Listado de alumnos';
  //protected override nombreModel = Alumno.name;

  // Se usa en la plantilla HTML para la carga de la foto.
  public baseEndpoint = BASE_ENDPOINT + '/alumnos';

  constructor(service: AlumnoService) {

    super(service);
    this.nombreModel = Alumno.name;
    this.titulo = 'Listado de alumnos';
  }

}
