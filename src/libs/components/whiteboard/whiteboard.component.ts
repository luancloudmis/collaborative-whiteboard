import { Component } from '@angular/core';
import { NgWhiteboardModule } from 'ng-whiteboard';
import { ToolboxService } from 'src/libs/services/toolbox.service';
import { Subscription, filter } from 'rxjs';

@Component({
  standalone: true,
  imports: [NgWhiteboardModule],
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss']
})
export class WhiteboardComponent {
  private dataSubscription: Subscription;
  constructor(private toolboxService: ToolboxService) {
      this.dataSubscription = toolboxService.data$.pipe(filter(t => t)).subscribe(data => {
       alert('change ' + data);
      });
  }
  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.dataSubscription.unsubscribe();
  }
}
