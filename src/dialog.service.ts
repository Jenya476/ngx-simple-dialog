import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
  ViewContainerRef
} from '@angular/core';
import {Subject} from 'rxjs';
import {DialogRef} from './dialog-ref';
import {DialogConfig} from './dialog-config';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  viewContainerRef: ViewContainerRef;
  componentRef: ComponentRef<any>;
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

    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.componentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);
    this.applicationRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.applicationRef.components[0].location.nativeElement.appendChild(domElem);

    return this.dialogRef;
  }

  close(dialogResult?: any) {
    if (dialogResult) {
      this.closeData.next(dialogResult);
    }
    this.clearAllData();
  }

  private clearAllData() {
    this.data = undefined;
    // this.applicationRef.components[0].instance.viewContainerRef.clear();
    this.componentRef.destroy();
    this.closeData.unsubscribe();
  }
}
