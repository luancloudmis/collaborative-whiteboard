import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:3000');
  }

  public connect(): void {
    console.log('Connecting');
  }

  public sendMessage(message: any): void {
    this.socket$.next(message);
  }

  public getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }
}
