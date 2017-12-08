// TODO: custom formControl with controlValueAccessor

import { Component, forwardRef, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const EXPANDED_TEXTAREA_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaExpandedComponent),
  multi: true,
};

@Component({
  selector: 'textareaExpanded',
  template: `
    <div>
      <label for="area">Test Textarea</label>
      <textarea id="area" #textarea contenteditable="false"
                tabindex="1" (input)="change($event)">
      </textarea>
    </div>
  `,
  preserveWhitespaces: true,
  providers: [EXPANDED_TEXTAREA_VALUE_ACCESSOR]
})
export class TextareaExpandedComponent implements ControlValueAccessor {
  @ViewChild('textarea') textarea;
  onChange;

  constructor(private renderer: Renderer2) { }

  writeValue(obj: any): void {
    const textarea = this.textarea.nativeElement;
    this.renderer.setProperty(textarea, 'textContent', '');
  }

  registerOnChange(fn: any): void {}

  change($event) {}

  registerOnTouched(fn: any): void {}
  setDisabledState(isDisabled: boolean): void {}
}
