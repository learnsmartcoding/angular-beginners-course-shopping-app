import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-errors',
  templateUrl: './display-errors.component.html',
  styleUrls: ['./display-errors.component.css']
})
export class DisplayErrorsComponent implements OnInit {
  @Input() errors: string[] = [];
  constructor() { }

  ngOnInit(): void {
  }
//this component will be used if we cant get what error is based on API response.
}
