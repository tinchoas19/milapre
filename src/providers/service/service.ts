import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators/tap';
import { Observable } from 'rxjs';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ServiceProvider Provider');
  }


  getToken(): Observable<any> {
    var headers = new Headers();

    headers.append('content-type', 'application/x-www-form-urlencoded');
    const requestOptions = new RequestOptions({ headers: headers });


    var body = JSON.stringify({ grant_type: 'password', username: '3654336901', password: '12345678' });

    return this.http.post("https://micuentamilatesting.microlending.com.ar/rest/v1/tokencliente", body, { headers: headers, withCredentials: true })
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data)))
      );
  }

  getDatosCliente(TipoDocumento,NroDocumento): Observable<any> {
    var headers = new Headers();
    headers.append("authorization", "Bearer " + this.getToken());
    const requestOptions = new RequestOptions({ headers: headers });
    return this.http.get("https://micuentamilatesting.microlending.com.ar/rest/v1/persona?TipoDocumento=" + TipoDocumento + "&NroDocumento=" + NroDocumento, requestOptions)
    .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data)))
    );
  }

  getPrestamoCliente(TipoDocumento,NroDocumento,SoloVigentes): Observable<any> {
    var headers = new Headers();
    headers.append("authorization", "Bearer " + this.getToken());
    const requestOptions = new RequestOptions({ headers: headers });
    return this.http.get("https://micuentamilatesting.microlending.com.ar/rest/v1/prestamo?TipoDocumento=" + TipoDocumento + "&NroDocumento=" + NroDocumento + "&SoloVigentes=" + SoloVigentes,requestOptions)
    .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data)))
    );
  }

  getPrestamoDetalle(PrestamoId): Observable<any> {
    var headers = new Headers();
    headers.append("authorization", "Bearer " + this.getToken());
    const requestOptions = new RequestOptions({ headers: headers });
    return this.http.get("https://micuentamilatesting.microlending.com.ar/rest/v1/prestamo/" + PrestamoId)
    .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data)))
    );
  }
  
}
