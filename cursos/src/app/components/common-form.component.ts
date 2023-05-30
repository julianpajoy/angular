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
  protected redirigir: string;

  protected nombreModel: string;

  /*
  * Se importa el service de Alumno que contiene
  * el metodo de "crear". 
  * 
  * «Router»: Esto se utiliza para rastrear que pagina activo el enrutador 
  * por ultima vez. Cuando falla un intento de navegacion, A continuacion, 
  * el enrutador puede utilizar esto para calcular como restaurar el estado 
  * a la actividad anterior pagina.
  */
  constructor(@Inject('servicio') protected servicio: S,
    protected enrutador: Router, // Devuelve al listado inicial
    protected ruta: ActivatedRoute) { } // Obtener parametros de la ruta

  ngOnInit() {
    this.ruta.paramMap.subscribe(parametros => {
      const id: number = +parametros.get('id');
      //const id: number = +(parametros.get('id') != null);
      if (id) {
        this.servicio.ver(id).subscribe(modelo => {
          this.modelo = modelo;
          this.titulo = 'Editar ' + this.nombreModel; // En caso de edicion diga "Editar examen"
        });
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
        this.enrutador.navigate([this.redirigir]);
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


  public editar(): void {
    this.servicio.editar(this.modelo).subscribe({
      next: m => {
        console.log(m);
        Swal.fire('Modificado', `${this.nombreModel} ${m.nombre} actualizado con éxito`, 'success');
        this.enrutador.navigate([this.redirigir]);
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
