import {Component, OnInit} from '@angular/core';
import {WebsocketService} from "../libs/services/websocket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
