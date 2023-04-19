import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private basePuntofinal = 'http://localhost:8090/api/alumnos';

  // Variable del header en el metodo "crear"
  private cabeceras: HttpHeaders = new HttpHeaders( { 'Content-Type': 'application/json' } );

  constructor(private http: HttpClient) { }

  // Metodo para listar
  /* Opcion 1
    public listar(): Observable<Alumno[]>{
      return this.http.get(this.basePuntofinal).pipe(
        map(alumnos => {
          return alumnos as Alumno[];  
        }
      )
    );
  }
  */

  /* Opcion 2
  public listar(): Observable<Alumno[]>{
    return this.http.get(this.basePuntofinal).pipe(
      map(alumnos => alumnos as Alumno[])
    );
  }
  */

  // Opción 3, mas resumido
  public listar(): Observable<Alumno[]>{
    return this.http.get<Alumno[]>(this.basePuntofinal);
  }

  // Metodo para ver Alumno por Id
  public ver(id: number): Observable<Alumno>{
    
    // FORMA 1: return this.http.get<Alumno>(this.basePuntofinal + '/' +id);

    // FORMA 2:
    return this.http.get<Alumno>(`${this.basePuntofinal}/${id}`);
  }

  // Metodo crear alumno
  public crear(alumno: Alumno): Observable<Alumno>{
    return this.http.post<Alumno>(this.basePuntofinal, alumno, 
      { headers: this.cabeceras });
  }

  // Metodo editar alumno por Id
  public editar(alumno: Alumno): Observable<Alumno>{
    return this.http.put<Alumno>(this.basePuntofinal + '/' +alumno.id, alumno, 
    { headers: this.cabeceras });
  }

  // Metodo eliminar
  public eliminar(id: number): Observable<void>{
    return this.http.delete<void>(`${this.basePuntofinal}/${id}`);
  }

}
