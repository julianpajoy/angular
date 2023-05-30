import { Component } from '@angular/core';
import { CommonListarComponent } from '../common-listar.component';
import { ExamenService } from 'src/app/services/examen.service';
import { Examen } from 'src/app/models/examen';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent extends CommonListarComponent<Examen, ExamenService>{

  constructor(service: ExamenService) {
    super(service);
    this.titulo = 'Listado de exámenes';
    this.nombreModel = Examen.name;
  }

}
