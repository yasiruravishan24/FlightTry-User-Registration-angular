import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private preloader: boolean = false;

  private subject = new Subject<any>;

  constructor() { }

  showPreloader(): void {
    this.preloader = !this.preloader;
    this.subject.next(this.preloader);
  }

  onPreload(): Observable<any> {
    return this.subject.asObservable();
  }

}
