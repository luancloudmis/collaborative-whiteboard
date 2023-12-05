import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket | undefined;
  private messageSubject: Subject<any> = new Subject<any>();

  constructor() {}

  private setupSocket(): void {
    const url = 'http://localhost:5000';
    if (!this.socket) {
      this.socket = io(url);
      this.socket.on('connect', () => {
        console.log('WebSocket connected');
      });
      this.socket.on('message', (message: any) => {
        this.messageSubject.next(message);
      });
      this.socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
      });
    }
  }

  public connect(): void {
    if (!this.socket || this.socket.disconnected) {
      this.setupSocket();
    }
  }

  public sendMessage(message: any): void {
    if (this.socket) {
      this.socket.emit('message', message);
    } else {
      console.error('WebSocket is not connected.');
    }
  }

  public getMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = undefined;
    }
  }
}
