
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Directive } from '@angular/core';
import { Observable } from 'rxjs';
import { Generico } from '../models/generico';

// E entity
@Directive()
export abstract class ComunService<E extends Generico> {

  protected basePuntofinal: string;
 
  // Variable del header en el metodo "crear"
  protected cabeceras: HttpHeaders = new HttpHeaders( { 'Content-Type': 'application/json' } );

  constructor(protected http: HttpClient) { }

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
  public listar(): Observable<E[]>{
    return this.http.get<E[]>(this.basePuntofinal);
  }

  // Listar por pagina
  public listarPaginas(pagina: string, tamanio: string): Observable<any>{
    const parametro = new HttpParams()
    .set('page', pagina)
    .set('size', tamanio);
    return this.http.get<any>(this.basePuntofinal + '/pagina', { params: parametro });
  }


  // Metodo para ver Alumno por Id
  public ver(id: number): Observable<E>{
    
    // FORMA 1: return this.http.get<Alumno>(this.basePuntofinal + '/' +id);

    // FORMA 2:
    return this.http.get<E>(`${this.basePuntofinal}/${id}`);
  }

  // Metodo crear alumno
  public crear(e: E): Observable<E>{
    return this.http.post<E>(this.basePuntofinal, e, 
      { headers: this.cabeceras });
  }

  // Metodo editar alumno por Id
  public editar(e: E): Observable<E>{
    return this.http.put<E>(this.basePuntofinal + '/' +e.id, e, 
    { headers: this.cabeceras });
  }

  // Metodo eliminar
  public eliminar(id: number): Observable<void>{
    return this.http.delete<void>(`${this.basePuntofinal}/${id}`);
  }

}
