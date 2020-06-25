import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//componente para crear empleado
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
//componente para lista empleados 
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
//componente para editar empleados 
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
//dependencia de formularios reactivos
import { ReactiveFormsModule } from '@angular/forms';
//dependencia para cliente httpclient
import { HttpClientModule } from '@angular/common/http';
//incluir mi servicio como proveedor 
import { ApiService } from './service/api.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    EmployeeListComponent,
    EmployeeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})

export class AppModule { }