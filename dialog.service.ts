import {ApplicationRef, ComponentFactoryResolver, Injectable, Injector, Type, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {DialogRef} from './dialog-ref';
import {DialogConfig} from './dialog-config';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  viewContainerRef: ViewContainerRef;
  data: any;
  closeData: Subject<any>;
  dialogRef = new DialogRef(this);
  constructor(private injector: Injector,
              private applicationRef: ApplicationRef,
  private componentFactoryResolver: ComponentFactoryResolver) {
  }

  open<T, D = any>(component: Type<T>, config?: DialogConfig<D>): DialogRef {
    if (config.data) {
      this.data = config.data;
    }

    this.closeData = new Subject<any>();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.applicationRef.components[0].instance.viewContainerRef.createComponent(componentFactory);
    return this.dialogRef;
  }

  close(dialogResult?: any) {
    if (dialogResult) {
      this.closeData.next(dialogResult);
    }
    this.clearAllData();
  }

  clearAllData() {
    this.data = undefined;
    this.applicationRef.components[0].instance.viewContainerRef.clear();
    this.closeData.unsubscribe();
  }
}
