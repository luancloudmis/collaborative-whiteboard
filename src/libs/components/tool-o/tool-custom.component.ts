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
  supportTools = [ToolsEnum.BRUSH, ToolsEnum.TEXT];
  supportStroke = ['black', 'red', 'green', 'yellow'];
  supportBackground = [
    'transparent',
    '#ffc9c9',
    '#b2f2bb',
    '#a5d8ff',
    '#ffec99',
  ];
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
