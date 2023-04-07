import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // isIframe = false;

  
  // ngOnInit(): void {
  //   this.isIframe = window !== window.parent && !window.opener;
  // }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    debugger;
    $event.preventDefault();
    $event.returnValue = '';
  }

  @HostListener('window:unload', ['$event'])
  beforeunload($event: any) {
    // Do cleanup here, if necessary
  }
}
