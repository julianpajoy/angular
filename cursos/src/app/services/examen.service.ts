import { Injectable } from '@angular/core';
import { ComunService } from './comun.service';
import { Examen } from '../models/examen';
import { BASE_ENDPOINT } from '../config/app';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends ComunService<Examen>{

  protected override basePuntofinal = BASE_ENDPOINT + '/examenes';

  constructor(http: HttpClient) { 
    super(http);
  }
}
