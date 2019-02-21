import {Observable} from 'rxjs';
import {DialogService} from './dialog.service';

export class DialogRef {

  constructor(private dialogService: DialogService) {}

  afterClosed(): Observable<any> {
    return this.dialogService.closeData;
  }
}
