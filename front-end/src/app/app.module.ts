import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ToolboxComponent } from '../libs/components/toolbox/toolbox.component';
import { WhiteboardComponent } from 'src/libs/components/whiteboard/whiteboard.component';
import { NavigationComponent } from '../libs/components/navigation/navigation.component';
import { WebsocketService } from 'src/libs/services/websocket.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    WhiteboardComponent,
    ToolboxComponent,
    NavigationComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  constructor(private websocketService: WebsocketService) {}
  ngOnInit(): void {
    this.websocketService.connect();

    this.websocketService.sendMessage({
      type: 'hello',
      content: 'Hello, server!',
    });

    this.websocketService.getMessages().subscribe((message) => {
      console.log('Received message:', message);
    });
  }
}
