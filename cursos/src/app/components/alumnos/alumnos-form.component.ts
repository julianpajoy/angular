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

    private fotoSeleccionada: File;
    
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

  public seleccionarFoto(evento): void{

    this.fotoSeleccionada = evento.target.files[0];
    console.info(this.fotoSeleccionada);
  }

  /*
  Se sobreescribe el metodo "crear" dado que el alumno, puede venir sin foto
  como tambien puede venir con foto.
  */
  public override crear(): void{

    // Si no selecciona foto se llama al metodo padre "crear"
    if(!this.fotoSeleccionada){
      super.crear();
    }
    else{
      this.servicio.crearConFoto(this.modelo, this.fotoSeleccionada).subscribe({
        next: alumno => {
          console.log(alumno);
          Swal.fire('Nuevo:', `${this.nombreModel} ${alumno.nombre} creado con éxito`, 'success');
          this.redirigir.navigate([this.redirigido]);
        },
        error: err => {
          if (err.status === 400) {
            this.errores = err.error;
            console.log(this.errores);
          }
        }
      });
    }
  }


  /*
  Se sobreescribe el metodo "editar" dado que el alumno, puede venir sin foto
  como tambien puede venir con foto.
  */
  public override editar(): void{

    // Si no selecciona foto se llama al metodo padre "crear"
    if(!this.fotoSeleccionada){
      super.editar();
    }
    else{
      this.servicio.editarConFoto(this.modelo, this.fotoSeleccionada).subscribe({
        next: alumno => {
          console.log(alumno);
          Swal.fire('Modificado:', `${this.nombreModel} ${alumno.nombre} actualizado con éxito`, 'success');
          this.redirigir.navigate([this.redirigido]);
        },
        error: err => {
          if (err.status === 400) {
            this.errores = err.error;
            console.log(this.errores);
          }
        }
      });
    }
  }
}
