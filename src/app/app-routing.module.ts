import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './componentes/login/login.component';
import {RegistroComponent} from './componentes/registro/registro.component';
import {RecuperarClaveComponent} from './componentes/recuperar-clave/recuperar-clave.component';
import {InicioComponent} from './componentes/inicio/inicio.component';
import {ProductoComponent} from './componentes/producto/producto.component';
import {FacturacionComponent} from './componentes/facturacion/facturacion.component';
import {EmpresaComponent} from './componentes/empresa/empresa.component';
import {ClienteComponent} from './componentes/cliente/cliente.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'empresa', component: EmpresaComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar-clave', component: RecuperarClaveComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'facturacion', component: FacturacionComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
