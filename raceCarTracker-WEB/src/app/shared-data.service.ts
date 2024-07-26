import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private storageKey = 'sharedData';

  // BehaviorSubject to hold the current shared data
  private sharedDataSubject = new BehaviorSubject<any>(this.loadData());

  // Observable to allow components to subscribe to changes
  sharedData$ = this.sharedDataSubject.asObservable();

  constructor() {
    window.addEventListener('storage', this.onStorageChange.bind(this));
  }

  private loadData(): any {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  private onStorageChange(event: StorageEvent) {
    if (event.key === this.storageKey) {
      this.sharedDataSubject.next(this.loadData());
    }
  }

  updateSharedData(data: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    console.log(JSON.stringify(data))
    this.sharedDataSubject.next(data);
  }
}