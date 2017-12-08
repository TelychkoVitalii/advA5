import { ComponentFactoryResolver, Inject, Injectable } from '@angular/core';
import { DynamicComponent } from './dynamic/dynamic.component';

@Injectable()

export class LoaderService {
  factoryResolver: any;
  rootViewContainer: any;

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addDynamicComponent() {
    const factory = this.factoryResolver.resolveComponentFactory(DynamicComponent);
    const component = factory.create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);
  }
}
