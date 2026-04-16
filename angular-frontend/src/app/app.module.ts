import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent // <--- Esto le dice al módulo que use tu lógica de productos
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,        // <--- Necesario para el formulario de productos
    HttpClientModule    // <--- Necesario para que el ProductoService funcione
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }