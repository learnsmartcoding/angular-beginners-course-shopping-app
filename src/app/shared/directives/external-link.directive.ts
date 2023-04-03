import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'a[externalLink]'
})
export class ExternalLinkDirective {
  constructor(private el: ElementRef) {
    const link = el.nativeElement as HTMLAnchorElement;
    if (link.host !== window.location.host) {        
      link.style.color = 'red';
      link.innerHTML += ' <i class="fa fa-external-link"></i>';
    }
  }
}