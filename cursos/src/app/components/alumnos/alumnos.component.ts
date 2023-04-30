import { Component } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2';

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

  public eliminar(alumno: Alumno): void{
    /*if(confirm('¿Seguro que desea eliminar a ' +alumno.nombre+ '?')){
      this.service.eliminar(alumno.id).subscribe(() => {
        this.alumnos = this.alumnos.filter(a => a !== alumno);
        //alert(`Alumno ${alumno.nombre} eliminado con éxito`);
        Swal.fire('Eliminado: ', `Alumno ${alumno.nombre} eliminado con éxito`, 'success');
      });
    }*/

    Swal.fire({
      title: '¡Cuidado!',
      text: '¿Seguro que desea eliminar a ' +alumno.nombre+ '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(alumno.id).subscribe(() => {
          this.alumnos = this.alumnos.filter(a => a !== alumno);
          Swal.fire('Eliminado: ', `Alumno ${alumno.nombre} eliminado con éxito`, 'success');
        });
      }
    })

  }

}
