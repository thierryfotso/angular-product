import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderServiceService {

  private isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.isLoading.asObservable();
  
  show() {
    this.isLoading.next(true);
  }
  hide() {
    this.isLoading.next(false);
  }
}