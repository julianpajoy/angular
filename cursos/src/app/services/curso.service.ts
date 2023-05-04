import { Injectable } from '@angular/core';
import { Curso } from '../models/curso';
import { ComunService } from './comun.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends ComunService<Curso>{

  protected override basePuntofinal = 'http://localhost:8090/api/cursos';
}
