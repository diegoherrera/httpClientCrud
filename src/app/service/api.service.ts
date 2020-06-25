import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  //la url la lee del objeto json enviroment que es donde resguardamos propiedades
  baseUri:string = environment.apiUrl;
  //defino un headers generico para todas las llamadas que realizamos
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  //inyecto el cliente http para realizar las operaciones 
  constructor(private http: HttpClient) { }

  //metodo que se encarga de crear un empleado 
  //recibe el objeto con el que realizamos el request al servicio
  createEmployee(data): Observable<any> {

    //obtenemos la uri del servicio 
    let url = `${this.baseUri}`;
    //recuerda que como estamos usando json-serve 
    //este requiere que los registros tengan un ID 
    let currentDate = new Date();
    //autogeneramos un id calculado en base a la hora y minutos 
    let calcular = currentDate.getHours() + currentDate.getMinutes();
    //creamos el identificador que calculamos 
    data.id = calcular;
    //llamamos la operacion post 
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // metodo que se encarga de obtener todos los empleados 
  getEmployees() {
    return this.http.get(`${this.baseUri}`);
  }

  // metodo que se encarga de obtener un empleado con el identificador
  getEmployee(id): Observable<any> {
    //armo la url del servicio para la operacion
    let url = `${this.baseUri}/${id}`;
    //realizamos la llamada de una operacion GET
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // metodo utilizado para actualizar el empleado
  //recibe 2 parametros  un identificador del datos y el segundo
  //los nuestros datos para el identificador 
  updateEmployee(id, data): Observable<any> {
    //obtenemos la url de la operacion
    let url = `${this.baseUri}/${id}`;
    //realizamos una llamada a la operacion PUT 
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Metodo que se encarga de elminar el empledo 
  // recibe el paramro id a eliminar
  deleteEmployee(id): Observable<any> {
    //prepara la url de la operacion
    let url = `${this.baseUri}/${id}`;
    //llamamos a la operacion delete para elminar el empleado
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // gestionamos errores  
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Identifico errores de aplicacion
      errorMessage = error.error.message;
    } else {
      // identifico errores de servidr
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}