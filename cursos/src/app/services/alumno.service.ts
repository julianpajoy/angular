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

}
