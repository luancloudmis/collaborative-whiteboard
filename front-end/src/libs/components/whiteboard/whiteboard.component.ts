import { Component } from '@angular/core';
import { NgWhiteboardModule, ToolsEnum } from 'ng-whiteboard';
import { ToolboxService } from 'src/libs/services/toolbox.service';
import { filter, takeUntil } from 'rxjs';
import { DestroyService } from '../../services/destroy.service';

@Component({
  standalone: true,
  imports: [NgWhiteboardModule],
  providers: [DestroyService],
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss'],
})
export class WhiteboardComponent {
  constructor(
    private toolboxService: ToolboxService,
    private readonly destroy$: DestroyService
  ) {}
  onChangeData = (...params: any[]) => {
    window.console.log('>>>', ...params);
  };
  get selectedTool(): ToolsEnum {
    return this.toolboxService.selectedTool;
  }
  get selectedStroke(): string {
    return this.toolboxService.selectedStroke;
  }
  get selectedBackground(): string {
    return this.toolboxService.selectedBackground;
  }
}
