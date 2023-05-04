import { Injectable } from '@angular/core';
import { ComunService } from './comun.service';
import { Examen } from '../models/examen';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends ComunService<Examen>{

  protected override basePuntofinal = 'http://localhost:8090/api/examenes';
}
