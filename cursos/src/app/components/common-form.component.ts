import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ComunService } from '../services/comun.service';
import { Generico } from '../models/generico';

@Component({
  selector: 'common-form-component',
  template: '<div></div>'
})
export abstract class CommonFormComponent<E extends Generico, S extends ComunService<E>> {
  titulo: string;

  //alumno: Alumno = new Alumno();
  modelo: E;

  // Errores llenado del formulario
  errores: any;

  // Para asignar la ruta «this.redirigir.navigate(['/alumnos']);»
  protected redirigido: string;

  protected nombreModel: string;

  /*
  * Se importa el service de Alumno que contiene
  * el metodo de "crear". 
  */
  constructor(@Inject('servicio') protected servicio: S,
        protected redirigir: Router,
    protected ruta: ActivatedRoute) { } // Obtener parametros de la ruta

  ngOnInit() {
    this.ruta.paramMap.subscribe(parametros => {
      const id: number = +parametros.get('id');
      //const id: number = +(parametros.get('id') != null);
      if (id) {
        this.servicio.ver(id).subscribe(modelo => this.modelo = modelo);
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


  public crear(): void {
    this.servicio.crear(this.modelo).subscribe({
      next: m => {
        console.log(m);
        Swal.fire('Nuevo:', `${this.nombreModel} ${m.nombre} creado con éxito`, 'success');
        this.redirigir.navigate([this.redirigido]);
      },
      error: err => {
        if (err.status === 400) { // Error "Bad request"
          this.errores = err.error;
          console.log(this.errores);
        }
      }/*,
      complete: () => { console.log(this.alumno); }*/
    });
  }


  public editarAlumno(): void {
    this.servicio.editar(this.modelo).subscribe({
      next: m => {
        console.log(m);
        Swal.fire('Modificado', `${this.nombreModel} ${m.nombre} actualizado con éxito`, 'success');
        this.redirigir.navigate([this.redirigido]);
      },
      error: err => {
        if (err.status === 400) { // Error "Bad request"
          this.errores = err.error;
          console.log(this.errores);
        }
      }/*,
      complete: () => { console.log(this.alumno); }*/
    });
  }
}
