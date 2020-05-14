import { Component, OnInit } from '@angular/core';
import {DatosServicio} from '../../servicio/DatosServicio';
import {Empresa} from '../../modelo/Empresa';
import {Properties} from '../../properties';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent implements OnInit {

  empresa: Empresa;

  constructor(public datosServicio: DatosServicio,
              public properties: Properties) { }

  ngOnInit() {
    this.empresa = this.datosServicio.empresa;
  }
}
