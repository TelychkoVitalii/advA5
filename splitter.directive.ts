// TODO: custom directive with controlValueAccessor

import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const SPLITTER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SplitterDirective),
  multi: true
};

@Directive({
  selector: '[splitterControl]',
  providers: [SPLITTER_VALUE_ACCESSOR]
})

export class SplitterDirective implements ControlValueAccessor {
  onChange;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event.target.value']) input(value) {
    this.onChange(value.split(',').filter(Boolean));
  }

  writeValue(value: any): void {
    const element = this.element.nativeElement;
    this.renderer.setProperty(element, 'value', value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }
}
