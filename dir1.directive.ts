import {Directive, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';

@Directive({
  selector: '[appDir1]'
})
export class Dir1Directive {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() set content(value: string) {
    const btnEl = this.renderer.createElement('button');
    const text = this.renderer.createText('Submit');
    this.renderer.appendChild(btnEl, text);
    this.renderer.appendChild(this.el.nativeElement, btnEl);
  }

}
