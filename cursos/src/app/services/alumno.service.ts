import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';
import { ComunService } from './comun.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends ComunService<Alumno>{

  protected override basePuntofinal = 'http://localhost:8090/api/alumnos';

  constructor(override http: HttpClient) {
    super(http);
  }

  /* BACKEND

  @PostMapping("/crear-con-foto")
	public ResponseEntity<?> crearConFoto(@Valid Alumno alumno, @RequestParam MultipartFile archivo)
  */
  public crearConFoto(alumno: Alumno, archivo: File): Observable<Alumno>{

    const formularioData = new FormData();
    formularioData.append('archivo', archivo);
    formularioData.append('nombre', alumno.nombre);
    formularioData.append('apellido', alumno.apellido);
    formularioData.append('email', alumno.email);

    return this.http.post<Alumno>(this.basePuntofinal+'/crear-con-foto', formularioData);
  }


  /* BACKEND

  @PutMapping("/editar-con-foto/{id}")
	public ResponseEntity <?> editar(@Valid Alumno alumno, @RequestParam MultipartFile archivo)
  */
  public editarConFoto(alumno: Alumno, archivo: File): Observable<Alumno>{

    const formularioData = new FormData();
    formularioData.append('archivo', archivo);
    formularioData.append('nombre', alumno.nombre);
    formularioData.append('apellido', alumno.apellido);
    formularioData.append('email', alumno.email);

    return this.http.put<Alumno>(`${this.basePuntofinal}/crear-con-foto/${alumno.id}`, formularioData);
  }

}
