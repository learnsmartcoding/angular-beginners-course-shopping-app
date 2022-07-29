import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isIframe = false;

  
  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
  }
}
