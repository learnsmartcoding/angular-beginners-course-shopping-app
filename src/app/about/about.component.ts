import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template:`<h2>About component</h2>`,
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
