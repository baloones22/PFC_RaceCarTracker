import { Round } from './../models/round-model';
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Car } from "../models/car-model";

export interface Track {
  _id: string;
  car: Car;
  round: Round;
}
export interface Send {
  car: number
}

@Injectable({
  providedIn: "root",
})
export class CarService {
  private apiPath = `${environment.URL_API}/cars`;

  private apiPath1 = `${environment.URL_API}/car`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Car[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDataToProcesses));
  }
  getById(id: number): Observable<Car> {
    const url = `${this.apiPath1}/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToCar));
  }

  getCurrentCarTrack(): Observable<Car> {
    const url = `${environment.URL_API}/current`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToCar));
  }

  create(car: Car): Observable<Car> {
    // car.transformer = car.transformer.id;
    return this.http
      .post(this.apiPath, car)
      .pipe(catchError(this.handleError), map(this.jsonDataToCar));
  }

  update(car: FormData): Observable<Car> {
    const url = `${this.apiPath}/${car.get("id")}`;
    return this.http
      .put(url, car)
      .pipe(catchError(this.handleError), map(this.jsonDataToCar));
  }
  delete(id: number): Observable<Car> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToCar));
  }
  sendToTrack(car: Send): Observable<Send> {
    const url = `${environment.URL_API}/track/`;
    return this.http
      .post(url, car)
      .pipe(catchError(this.handleError), map(this.jsonDataToSend));
  }
  takeTrack(car: Send): Observable<Send> {
    const url = `${environment.URL_API}/track/${car.car}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToSend));
  }
  private jsonDataToProcesses(jsonData: any): Car[] {
    const car: Car[] = [];
    jsonData.forEach((element: Car) => car.push(element as Car));
    return car;
  }

  private jsonDataToCar(jsonData: any): Car {
    return jsonData as Car;
  }

  private jsonDataToSend(jsonData: any): Send {
    return jsonData as Send;
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
