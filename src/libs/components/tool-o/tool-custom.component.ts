import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToolsEnum } from 'ng-whiteboard';
import { ToolboxService } from 'src/libs/services/toolbox.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-tool-custom',
  templateUrl: './tool-custom.component.html',
  styleUrls: ['./tool-custom.component.scss'],
})
export class ToolCustomComponent {
  supportTools = [
    ToolsEnum.BRUSH,
    ToolsEnum.TEXT,
    ToolsEnum.LINE,
    ToolsEnum.ELLIPSE,
    ToolsEnum.RECT,
  ];
  supportStroke: Record<ToolsEnum, string[]> = {
    [ToolsEnum.BRUSH]: ['black', 'red', 'green', 'yellow'],
    [ToolsEnum.SELECT]: [],
    [ToolsEnum.LINE]: ['black', 'red', 'green', 'yellow'],
    [ToolsEnum.IMAGE]: [],
    [ToolsEnum.ELLIPSE]: ['black', 'red', 'green', 'yellow'],
    [ToolsEnum.RECT]: ['black', 'red', 'green', 'yellow'],
    [ToolsEnum.TEXT]: [],
    [ToolsEnum.ERASER]: [],
  };
  supportBackground: Record<ToolsEnum, string[]> = {
    [ToolsEnum.BRUSH]: [
      'transparent',
      '#ffc9c9',
      '#b2f2bb',
      '#a5d8ff',
      '#ffec99',
    ],
    [ToolsEnum.SELECT]: [],
    [ToolsEnum.LINE]: [],
    [ToolsEnum.IMAGE]: [],
    [ToolsEnum.ELLIPSE]: [
      'transparent',
      '#ffc9c9',
      '#b2f2bb',
      '#a5d8ff',
      '#ffec99',
    ],
    [ToolsEnum.RECT]: [
      'transparent',
      '#ffc9c9',
      '#b2f2bb',
      '#a5d8ff',
      '#ffec99',
    ],
    [ToolsEnum.TEXT]: [],
    [ToolsEnum.ERASER]: [],
  };

  constructor(private toolboxService: ToolboxService) {}
  get selectedTool(): ToolsEnum {
    return this.toolboxService.selectedTool;
  }
  get selectedStroke(): string {
    return this.toolboxService.selectedStroke;
  }
  get selectedBackground(): string {
    return this.toolboxService.selectedBackground;
  }
  onChangeToolStroke(val: string) {
    this.toolboxService.updateStroke(val);
  }
  onChangeToolBackground(val: string) {
    this.toolboxService.updateBackground(val);
  }
}
