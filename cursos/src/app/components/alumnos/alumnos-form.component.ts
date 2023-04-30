import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent {
  titulo = "Crear alumno";

  // Atributo - instancia por defecto
  alumno: Alumno = new Alumno();

  // Errores llenado del formulario
  errores: any;

  /*
  * Se importa el service de Alumno que contiene
  * el metodo de "crear". 
  */
  constructor(private servicio: AlumnoService, 
              private redirigir: Router,
              private ruta: ActivatedRoute) {} // Obtener parametros de la ruta

  ngOnInit(){
    this.ruta.paramMap.subscribe(parametros => {
        const id: number = +parametros.get('id');
        //const id: number = +(parametros.get('id') != null);
        if(id != null){
          this.servicio.ver(id).subscribe(alumno => this.alumno = alumno);
        }
      }
    );
  }

  /*public crearAlumno(): void{
    this.servicio.crear(this.alumno).subscribe(alumno =>{
      console.log(alumno); // Muestra el alumno creado en la consola del navegador
      alert('Alumno ' +alumno.nombre +' creado con éxito');
      this.redirigir.navigate(['/alumnos']);
    }, err => {
      if(err.status === 400){
        this.errores = err.error;
        console.log(this.errores);
      }
    });
  }*/

  public crearAlumno(): void{
    this.servicio.crear(this.alumno).subscribe({
      next: alumno => {
        console.log(alumno);
        Swal.fire('Nuevo:', 'Alumno ' +alumno.nombre +' creado con éxito', 'success');
        this.redirigir.navigate(['/alumnos']);
      },
      error: err => {
        if(err.status === 400){ // Error "Bad request"
          this.errores = err.error;
          console.log(this.errores);
        }
      }/*,
      complete: () => { console.log(this.alumno); }*/
    });
  }

  public editarAlumno(): void{
    this.servicio.editar(this.alumno).subscribe({
      next: alumno => {
        console.log(alumno);
        Swal.fire('Modificado', `Alumno ${alumno.nombre} actualizado con éxito`,'success');
        this.redirigir.navigate(['/alumnos']);
      },
      error: err => {
        if(err.status === 400){ // Error "Bad request"
          this.errores = err.error;
          console.log(this.errores);
        }
      }/*,
      complete: () => { console.log(this.alumno); }*/
    });
  }
}
