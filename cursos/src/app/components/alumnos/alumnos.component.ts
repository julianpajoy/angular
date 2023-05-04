import { Component, ViewChild } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CommonListarComponent } from '../common-listar.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})

export class AlumnosComponent 
extends CommonListarComponent<Alumno, AlumnoService>{

  override titulo = 'Listado de alumnos';
  protected override nombreModel = Alumno.name;

  constructor(service: AlumnoService) {

    super(service);
  }

}
