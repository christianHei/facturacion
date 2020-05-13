import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { LoginComponent } from '@src/app/componentes/login/login.component';
import { MenuComponent } from '@src/app/componentes/menu/menu.component';
import { RegistroComponent } from '@src/app/componentes/registro/registro.component';
import { ProductoComponent } from '@src/app/componentes/producto/producto.component';
import { FacturacionComponent } from '@src/app/componentes/facturacion/facturacion.component';
import { EmpresaComponent } from '@src/app/componentes/empresa/empresa.component';
import { RecuperarClaveComponent } from '@src/app/componentes/recuperar-clave/recuperar-clave.component';
import { ClienteComponent } from '@src/app/componentes/cliente/cliente.component';
import { InicioComponent } from '@src/app/componentes/inicio/inicio.component';
//
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ErrorCampoComponent } from '@src/app/componentes/error-campo/error-campo.component';
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
import {DatosServicio} from '@src/app/servicio/DatosServicio';
import {Properties} from '@src/app/properties';
import {NotificacionServicio} from '@src/app/servicio/NotificacionServicio';
import { NotificacionComponent } from '@src/app/componentes/notificacion/notificacion.component';

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
    ConfirmDialogModule
  ],
  providers: [DatosServicio, Properties, NotificacionServicio],
  bootstrap: [AppComponent]
})
export class AppModule { }
