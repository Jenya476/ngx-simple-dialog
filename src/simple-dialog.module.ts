import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogService} from './dialog.service';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class SimpleDialogModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SimpleDialogModule,
      providers: [DialogService]
    };
  }
}

export {DialogService} from './dialog.service';
