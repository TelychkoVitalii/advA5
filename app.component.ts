import {
  Component, ElementRef, EmbeddedViewRef, Inject, Input, OnInit, Renderer2, TemplateRef, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoaderService } from './loader.service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public name = 'Vitalii';
  loaderService: any;
  @ViewChild('dynamic', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
  @ViewChild('tp1') _tp1: TemplateRef<any>;
  @ViewChild('btn') element: ElementRef;
  private view: EmbeddedViewRef<Object>;
  @Input() set isAdmin(value: boolean) {
    if (value) {
      this.view = this.viewContainerRef.createEmbeddedView(this._tp1);
    }
  }
  // @ViewChild('TextareaExpandedComponent') textareaExpanded: TextareaExpandedComponent;
  public disable: boolean;
  public show = false;
  public form;
  public person = {
    name: 'Vitalii'
  };
  options = [
    { id: 1, label: 'Option one' },
    { id: 2, label: 'Option two' },
    { id: 3, label: 'Option three' }
  ];
  states = [
    {name: 'Arizona', code: 'AZ'},
    {name: 'California', code: 'CA'},
    {name: 'Colorado', code: 'CO'}
  ];
  user = {
    skills: [
      { name: 'JS',  selected: true, id: 1 },
      { name: 'CSS',  selected: false, id: 2 },
    ]
  };
  testForm = new FormGroup({
    formControl: new FormControl(),
    control: new FormControl(this.options[0]),
    category: new FormControl(null)
  });



  constructor(private fb: FormBuilder,
              private el: ElementRef,
              @Inject (LoaderService) loaderService,
              @Inject (ViewContainerRef) viewContainerRef,
              private renderer: Renderer2) {
    this.loaderService = loaderService;
    loaderService.setRootViewContainerRef(viewContainerRef);
    loaderService.addDynamicComponent();
    this.form = this.fb.group({
      skills: this.buildSkills()
    });
  }

  ngOnInit() {
    this.loaderService.setRootViewContainerRef(this.viewContainerRef);
    this.loaderService.addDynamicComponent();
    setTimeout(() => {
      this.options = [
        { id: 1, label: 'Option one' },
        { id: 2, label: 'Option two' },
        { id: 3, label: 'Option three' },
        { id: 4, label: 'Option four' }
      ];
    }, 2000);
  }


  onCreate() {
    const btnEl = this.renderer.createElement('button');
    const text = this.renderer.createText('Submit');
    this.renderer.appendChild(btnEl, text);
    this.renderer.appendChild(this.element.nativeElement, btnEl);
  }

  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  buildSkills = () => this.fb.array(this.user.skills.map(s => this.fb.control(s.selected)));

  submit(value) {
    const f = Object.assign({}, value, {
      skills: value.skills.map((s, i) => {
        return {
          id: this.user.skills[i].id,
          selected: s
        };
      })
  });
    console.log(f);
  }

  compareFn(opt1, opt2): boolean {
    return opt1.id === opt2.id;
  }

  // onSend(e) {
  //   this.textareaExpanded.change(e);
  // }
}
