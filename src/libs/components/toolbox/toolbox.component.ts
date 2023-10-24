import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ToolboxService } from 'src/libs/services/toolbox.service';

@Component({
  standalone: true,
  selector: 'app-toolbox',
  imports: [NzCardModule, NzIconModule],
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent {
  constructor(private toolboxService: ToolboxService) {}
  onChangeToolbox (type: string) {
    this.toolboxService.updateData(type);
  }
}
