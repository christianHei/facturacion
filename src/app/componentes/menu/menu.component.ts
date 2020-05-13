import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  abrirNavbar = false;
  opcion: string;

  constructor(private router: Router) {
    this.opcion = '';
  }

  ngOnInit() {
  }

  toggleNavbar() {
    this.abrirNavbar = !this.abrirNavbar;
  }

  empresa() {
    this.opcion = 'Mi empresa';
    this.router.navigate(['/empresa']);
  }

  producto() {
    this.router.navigate(['/producto']);
    this.opcion = 'Mis productos';
  }

  facturacion() {
    this.router.navigate(['/cliente']);
  }

  cerrarSesion() {
    this.router.navigate(['/']);
  }

  inicio() {
    this.router.navigate(['/inicio']);
  }
}
