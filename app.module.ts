import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { DisableControlDirective } from './disableControl.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { TextareaExpandedComponent } from './textarea-expanded.component';
import { SplitterDirective } from './splitter.directive';
import { MyNgIfDirective } from './myNgIf.directive';
import { HttpClassComponent } from './httpClass';
import { AppService } from './app.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './config/token.interceptor';
import { JwtInterceptor } from './config/jwt.interceptor';
import { LoveComponent } from './typescript/tpsc';
import { Dir1Directive } from './dir1.directive';
import { Dir2Directive } from './dir2.directive';
import { DynamicComponent } from './dynamic/dynamic.component';
import { LoaderService } from './loader.service';

@NgModule({
  declarations: [
    LoveComponent,
    AppComponent,
    HttpClassComponent,
    DisableControlDirective,
    TextareaExpandedComponent,
    SplitterDirective,
    MyNgIfDirective,
    Dir1Directive,
    Dir2Directive,
    DynamicComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule
  ],
  providers: [AppService, LoaderService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  entryComponents: [DynamicComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
