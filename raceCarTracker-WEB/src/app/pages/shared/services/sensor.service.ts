import { Round } from '../models/round-model';
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Sensor} from "../models/sensor-model";

@Injectable({
  providedIn: "root",
})
export class SensorService {
  private apiPath = `${environment.URL_API}/sensors`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Sensor[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDataToProcesses));
  }
  getById(id: number): Observable<Sensor> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToSensor));
  }
  create(sensor: Sensor): Observable<Sensor> {
    // sensor.transformer = sensor.transformer.id;
    return this.http
      .post(this.apiPath, sensor)
      .pipe(catchError(this.handleError), map(this.jsonDataToSensor));
  }
  update(sensor: FormData): Observable<Sensor> {
    const url = `${this.apiPath}/${sensor.get("id")}`;
    return this.http
      .put(url, sensor)
      .pipe(catchError(this.handleError), map(this.jsonDataToSensor));
  }
  deleteAll():Observable<Sensor[]>{
    return this.http
      .delete(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDataToProcesses));
  }
  private jsonDataToProcesses(jsonData: any): Sensor[] {
    const sensor: Sensor[] = [];
    jsonData.forEach((element: Sensor) => sensor.push(element as Sensor));
    return sensor;
  }
  private jsonDataToSensor(jsonData: any): Sensor {
    return jsonData as Sensor;
  }
  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
