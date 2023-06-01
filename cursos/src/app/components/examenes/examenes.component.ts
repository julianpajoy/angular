import { Component } from '@angular/core';
import { CommonListarComponent } from '../common-listar.component';
import { Examen } from 'src/app/models/examen';
import { ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent extends CommonListarComponent<Examen, ExamenService> {

  constructor(service: ExamenService){
    super(service);
    this.titulo = 'Listado de examenes';
    this.nombreModel = Examen.name;
  }

}
