import { Round } from '../models/round-model';
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Laptime } from "./../models/laptime-model";
import { Car } from "../models/car-model";


@Injectable({
  providedIn: "root",
})
export class LaptimeService {
  private apiPath = `${environment.URL_API}/laptime`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Laptime[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDataToProcesses));
  }

  getById(id: number): Observable<Laptime> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToLaptime));
  }
  create(laptime: Laptime): Observable<Laptime> {
    // laptime.transformer = laptime.transformer.id;
    return this.http
      .post(this.apiPath, laptime)
      .pipe(catchError(this.handleError), map(this.jsonDataToLaptime));
  }

  update(laptime: FormData): Observable<Laptime> {
    const url = `${this.apiPath}/${laptime.get("id")}`;
    return this.http
      .put(url, laptime)
      .pipe(catchError(this.handleError), map(this.jsonDataToLaptime));
  }

  private jsonDataToProcesses(jsonData: any): Laptime[] {
    const laptime: Laptime[] = [];
    jsonData.forEach((element: Laptime) => laptime.push(element as Laptime));
    return laptime;
  }

  private jsonDataToLaptime(jsonData: any): Laptime {
    return jsonData as Laptime;
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
