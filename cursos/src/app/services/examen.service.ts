import { Injectable } from '@angular/core';
import { ComunService } from './comun.service';
import { Examen } from '../models/examen';
import { BASE_ENDPOINT } from '../config/app';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asignatura } from '../models/asignatura';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends ComunService<Examen>{

  protected override basePuntofinal = BASE_ENDPOINT + '/examenes';

  // La variable «http» puede tener cualquier otro nombre.
  constructor(http: HttpClient) { 
    super(http);
  }

  public buscarTodasAsignaturas(): Observable<Asignatura[]>{

    return this.http.get<Asignatura[]>(`${this.basePuntofinal}/asignaturas`);
  }

}
