// shared-data.service.ts
import { Injectable } from '@angular/core';
import { ToolsEnum } from 'ng-whiteboard';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolboxService {
  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();
  private _selectedTool = ToolsEnum.SELECT;
  get selectedTool () {
    return this._selectedTool;
  }
  updateTool(tool: any) {
    this._selectedTool = tool
  }
}