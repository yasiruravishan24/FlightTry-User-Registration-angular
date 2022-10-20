import { UiService } from './services/ui.service';
import { Component, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flightTry';
  isMobile: boolean = false;
  subscribtion! : Subscription;
  preloader : boolean = false;

  constructor(private modalService: NgbModal, private uiService : UiService) {
    
  }

  ngOnInit() {
    const innerWidth = window.innerWidth;
    this.checkScreenSize(innerWidth);

    this.subscribtion  = this.uiService.onPreload().pipe().subscribe((value) => {
      this.preloader = value;
    })
    
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  @HostListener('window:resize', ['$event'])
  onResize({ event }: { event: any; }) {
    const innerWidth = window.innerWidth;
    this.checkScreenSize(innerWidth);
  }

  checkScreenSize(width: number) {
    if(width < 1366) {
      this.isMobile = true;
      return;
    }
    this.isMobile = false;
  }

}
