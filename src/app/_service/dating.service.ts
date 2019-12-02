import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EtapaIdentificacion } from '../models';

export interface Identificacion {
  calificacion: string;
  caracteristicaId: number;
  descripcion: string;
  id: number;
  impacto: string;
  probabilidad: string;
  highlighted?: boolean;
}
@Injectable({
  providedIn: 'root'
})


export class DatingService {
  baseUrl = environment.apiUrl;
  constructor(public http: HttpClient) { }

  getCaracteristicasPorFactor(IdFactor: number): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'Caracteristicas/GetCaracteristicaPorFactor/' + IdFactor);
  }

  getListControls(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'Controls/GetListControls');
  }

  GuardarEvaluacion(model : EtapaIdentificacion): Observable<any[]> {
    return this.http.post<any[]>(this.baseUrl + 'Evaluacion/GuardarEvaluacion', model);
  }

  
}
