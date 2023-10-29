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
  private _selectedTool = ToolsEnum.BRUSH;
  private _selectedStroke: string = '';
  private _selectedBackground: string = '';
  get selectedTool() {
    return this._selectedTool;
  }
  get selectedStroke() {
    return this._selectedStroke;
  }
  get selectedBackground() {
    return this._selectedBackground;
  }
  updateTool(tool: any) {
    this._selectedTool = tool;
  }
  updateStroke(tool: any) {
    this._selectedStroke = tool;
  }
  updateBackground(tool: any) {
    this._selectedBackground = tool;
  }
}
