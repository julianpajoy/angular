import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Generico } from '../models/generico';
import { ComunService } from '../services/comun.service';

@Component({})
export abstract class CommonListarComponent<E extends Generico, S extends ComunService<E>> {

  titulo: string;

  // alumnos: Alumno[] | undefined;
  lista: E[] | undefined;
  protected nombreModel: string;

  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 4; // Por defecto
  opcTamanioPagina: number[] = [3, 5, 10, 25, 100];

  // traducir label paginador
  @ViewChild(MatPaginator) paginador: MatPaginator;

  constructor(protected service: S) {}

  ngOnInit(){
    /*this.service.listar().subscribe(alumnos => { // Recibe lista de datos
      this.alumnos = alumnos; // Observador
    });*/

    /* Como en "alumno.service.ts" recibe dos parametros de tipo string
    se hace la conversion a string de las paginas 
    const paginaActual = this.paginaActual+'';
    const totalPorPagina = this.totalPorPagina+'';

    this.service.listarPaginas(paginaActual, totalPorPagina)
    // p: paginacion
    .subscribe(p => {
      this.alumnos = p.content as Alumno[];
      this.totalRegistros = p.totalElements as number;
    });*/

    this.calcularRangos();
  }

  // Metodo para cambiar entre las paginas
  public paginar(evento: PageEvent): void{
    this.paginaActual = evento.pageIndex;
    this.totalPorPagina = evento.pageSize;
    this.calcularRangos();
  }


  private calcularRangos(){
    //const paginaActual = this.paginaActual+'';
    //const totalPorPagina = this.totalPorPagina+'';

    // p: paginacion
    this.service.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString())
    .subscribe(p => {
      this.lista = p.content as E[]; // p.content es la lista paginada y se convierte a un arreglo
      this.totalRegistros = p.totalElements as number; // Asignar el total de registros
      this.paginador._intl.itemsPerPageLabel = 'Registros por página';  // Cambiar el label a espaniol
    });
  }
 
  public eliminar(e: E): void{
    /*if(confirm('¿Seguro que desea eliminar a ' +alumno.nombre+ '?')){
      this.service.eliminar(alumno.id).subscribe(() => {
        this.alumnos = this.alumnos.filter(a => a !== alumno);
        //alert(`Alumno ${alumno.nombre} eliminado con éxito`);
        Swal.fire('Eliminado: ', `Alumno ${alumno.nombre} eliminado con éxito`, 'success');
      });
    }*/

    Swal.fire({
      title: '¡Cuidado!',
      text: '¿Seguro que desea eliminar a ' +e.nombre+ '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(e.id).subscribe(() => {
          // this.alumnos = this.alumnos.filter(a => a !== alumno);
          this.calcularRangos();
          Swal.fire('Eliminado: ', `${this.nombreModel} ${e.nombre} eliminado con éxito`, 'success');
        });
      }
    })

  }

}
