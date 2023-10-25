import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToolsEnum } from 'ng-whiteboard';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ToolboxService } from 'src/libs/services/toolbox.service';

@Component({
  standalone: true,
  selector: 'app-toolbox',
  imports: [NzCardModule, NzIconModule, CommonModule],
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss'],
})
export class ToolboxComponent {
  readonly supportTools = [
    {
      tool: ToolsEnum.SELECT,
      icon: `<svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M17.15 20.76l-2.94 1.5-3.68-6-4.41 3V1.24l12.5 12.01-4.41 1.5 2.94 6z" />
    </svg>`,
    },
    {
      tool: ToolsEnum.BRUSH,
      icon: `<svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      style="transform: scale(-1, 1)"
    >
      <path
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
      />
    </svg>`,
    },
    {
      tool: ToolsEnum.LINE,
      icon: ` <svg viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M 3 1 L 26 24 L 24 26 L 1 3 L 3 1 Z"></path>
    </svg>`,
    },
    {
      tool: ToolsEnum.RECT,
      icon: `<svg viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M 0 8 L 0 24 L 24 24 L 25 8 L 0 8 Z" />
    </svg>`,
    },
    {
      tool: ToolsEnum.ELLIPSE,
      icon: ` <svg viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <ellipse cx="13" cy="13" rx="13" ry="9"></ellipse>
    </svg>`,
    },
    {
      tool: ToolsEnum.TEXT,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="2 2 20 20" width="27" height="27">
      <path d="M5 4v3h5.5v12h3V7H19V4z" />
    </svg>`,
    },
    {
      tool: ToolsEnum.ERASER,
      icon: ` <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 13H5v-2h14v2z" />
    </svg>`,
    },
  ];
  constructor(
    private toolboxService: ToolboxService,
    private sanitizer: DomSanitizer
  ) {}
  onChangeToolbox(tool: ToolsEnum) {
    this.toolboxService.updateTool(tool);
  }
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  get selectedTool(): ToolsEnum {
    return this.toolboxService.selectedTool;
  }
}
