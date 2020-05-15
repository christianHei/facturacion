import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { FacturacionComponent } from './componentes/facturacion/facturacion.component';
import { EmpresaComponent } from './componentes/empresa/empresa.component';
import { RecuperarClaveComponent } from './componentes/recuperar-clave/recuperar-clave.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
//
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ErrorCampoComponent } from './componentes/error-campo/error-campo.component';
import {
  ButtonModule, ConfirmDialogModule,
  DialogModule,
  DropdownModule,
  InputTextModule,
  MenubarModule,
  MessagesModule,
  PanelModule, PasswordModule,
  TableModule
} from 'primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {HttpClientModule} from '@angular/common/http';
import {DatosServicio} from './servicio/DatosServicio';
import {Properties} from './properties';
import {NotificacionServicio} from './servicio/NotificacionServicio';
import { NotificacionComponent } from './componentes/notificacion/notificacion.component';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    RegistroComponent,
    ProductoComponent,
    FacturacionComponent,
    EmpresaComponent,
    RecuperarClaveComponent,
    ClienteComponent,
    InicioComponent,
    ErrorCampoComponent,
    NotificacionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ScrollingModule,
    TableModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    MenubarModule,
    DropdownModule,
    HttpClientModule,
    MessagesModule,
    PasswordModule,
    ConfirmDialogModule,
    HttpModule
  ],
  providers: [DatosServicio, Properties, NotificacionServicio],
  bootstrap: [AppComponent]
})
export class AppModule { }
