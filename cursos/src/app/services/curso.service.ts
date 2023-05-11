import { Injectable } from '@angular/core';
import { Curso } from '../models/curso';
import { ComunService } from './comun.service';
import { HttpClient } from '@angular/common/http';
import { BASE_ENDPOINT } from '../config/app';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends ComunService<Curso>{

  protected override basePuntofinal = BASE_ENDPOINT + '/cursos';

  constructor(http: HttpClient) { 
    super(http);
  }
}
