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

  private setupSocket(onConnected?: () => void): void {
    const url = 'http://localhost:6969';
    if (!this.socket) {
      this.socket = io(url);
      this.socket.on('connect', () => {
        if (onConnected) onConnected();
      });
      this.socket.on('message', (message: any) => {
        this.messageSubject.next(message);
      });
      this.socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
      });
    }
  }

  public connect(onConnected?: () => void): void {
    if (!this.socket || this.socket.disconnected) {
      this.setupSocket(onConnected);
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

  public sendICECandidate(candidate: RTCIceCandidateInit): void {
    if (this.socket) {
      this.socket.emit('ice-candidate', candidate);
    } else {
      console.error('WebSocket is not connected.');
    }
  }

  public sendOffer(offer: RTCSessionDescriptionInit): void {
    if (this.socket) {
      this.socket.emit('offer', offer);
    } else {
      console.error('WebSocket is not connected.');
    }
  }

  public sendAnswer(answer: RTCSessionDescriptionInit): void {
    if (this.socket) {
      this.socket.emit('answer', answer);
    } else {
      console.error('WebSocket is not connected.');
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = undefined;
    }
  }
}
