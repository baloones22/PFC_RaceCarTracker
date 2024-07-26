import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // BehaviorSubject para sum1 e outras variáveis
  sum1_1Source = new BehaviorSubject<number>(14783234);
  sum2_1Source = new BehaviorSubject<number>(12);
  sum3_1Source = new BehaviorSubject<number>(13);
  sum1_2Source = new BehaviorSubject<number>(0);
  sum2_2Source = new BehaviorSubject<number>(0);
  sum3_2Source = new BehaviorSubject<number>(0);
  private sum1_3Source = new BehaviorSubject<number>(0);
  private sum2_3Source = new BehaviorSubject<number>(0);
  private sum3_3Source = new BehaviorSubject<number>(0);
  runner1Source= new BehaviorSubject<number>(1);
  runner2Source= new BehaviorSubject<number>(2);
  runner3Source= new BehaviorSubject<number>(3);

  runner1 = this.runner1Source.asObservable();
  runner2 = this.runner2Source.asObservable();
  runner3 = this.runner3Source.asObservable();

  sum1_1 = this.sum1_1Source.asObservable();
  sum2_1 = this.sum2_1Source.asObservable();
  sum3_1 = this.sum3_1Source.asObservable();

  sum1_2 = this.sum1_2Source.asObservable();
  sum2_2 = this.sum2_2Source.asObservable();
  sum3_2 = this.sum3_2Source.asObservable();

  sum1_3 = this.sum1_3Source.asObservable();
  sum2_3 = this.sum2_3Source.asObservable();
  sum3_3 = this.sum3_3Source.asObservable();




  
constructor(){}
  // Métodos para atualizar os valores
  updateSum1_1(value: number) {
    console.log('Atualizando sum1_1 no servicets para:',value);
    this.sum1_1Source.next(value);
  }
  updateSum2_1(value: number) {
    console.log('Atualizando sum2_1 no servicets para:',value);
    this.sum2_1Source.next(value);
  }
  updateSum3_1(value: number) {
    console.log('Atualizando sum3_1 no servicets para:',value);
    this.sum3_1Source.next(value);
  }

  updateSum1_2(value: number) {
    console.log('Atualizando sum1_2 no servicets para:',value);
    this.sum1_2Source.next(value);
  }
  updateSum2_2(value: number) {
    console.log('Atualizando sum2_2 no servicets para:',value);
    this.sum2_2Source.next(value);
  }
  updateSum3_2(value: number) {
    console.log('Atualizando sum3_2 no servicets para:',value);
    this.sum3_2Source.next(value);
  } 
  
  updateSum1_3(value: number) {
    this.sum1_3Source.next(value);
  }
  updateSum2_3(value: number) {
    this.sum2_3Source.next(value);
  }
  updateSum3_3(value: number) {
    this.sum3_3Source.next(value);
  }
  updateRunner1(value: number) {
    this.runner1Source.next(value);
    console.log('Atualizando runner1 no servicets para:',value);
  }
  updateRunner2(value: number) {
    this.runner2Source.next(value);
    console.log('Atualizando runner2 no servicets para:',value);
  }
  updateRunner3(value: number) {
    this.runner3Source.next(value);
    console.log('Atualizando runner3 no servicets para:',value);
  }
}