import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2'
import { CommonFormComponent } from '../common-form.component';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent
  extends CommonFormComponent<Alumno, AlumnoService>{

  override titulo = "Crear alumno";

  // Atributo - instancia por defecto
  alumno: Alumno = new Alumno();

  /*
  * Se importa el service de Alumno que contiene
  * el metodo de "crear". 
  */
  constructor(servicio: AlumnoService,
    redirigir: Router,
    ruta: ActivatedRoute) {
      
    super(servicio, redirigir, ruta);
    this.titulo = "Crear alumno";
    this.modelo = new Alumno();
    this.redirigido = '/alumnos';
    this.nombreModel = Alumno.name;
  }

}
