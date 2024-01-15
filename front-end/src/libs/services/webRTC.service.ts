import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { WebSocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class WebRTCService {
  private peerConnection: RTCPeerConnection | undefined;
  private messageSubject: Subject<any> = new Subject<any>();
  dataChannel!: RTCDataChannel;
  messageSubscription!: Subscription;

  constructor(private webSocketService: WebSocketService) {}

  private createPeerConnection(): void {
    this.webSocketService.connect(async () => {
      this.peerConnection = new RTCPeerConnection();
      this.dataChannel =
        this.peerConnection.createDataChannel('sendDataChannel');
      this.peerConnection.ondatachannel = (event) => {
        this.dataChannel = event.channel;
        this.setupDataChannel();
      };

      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this.webSocketService.sendICECandidate(event.candidate);
        }
      };

      const offer = await this.peerConnection.createOffer();
      this.peerConnection.setLocalDescription(offer);
      this.webSocketService.sendOffer(offer);

      this.webSocketService.getMessage().subscribe((message: any) => {
        console.log('message', message);
        this.handleSignalingMessage(message);
      });
    });
  }

  handleSignalingMessage(message: any) {
    if (this.peerConnection) {
      if (message.type === 'offer') {
        this.peerConnection.setRemoteDescription(
          new RTCSessionDescription(message.payload)
        );
        this.peerConnection
          .createAnswer()
          .then((answer) => {
            return this.peerConnection!.setLocalDescription(answer);
          })
          .then(() => {
            // Send the answer to the remote peer via WebSocket
            if (this.peerConnection!.localDescription)
              this.webSocketService.sendAnswer(
                this.peerConnection!.localDescription
              );
          })
          .catch((err) => {
            console.error('Error creating answer:', err);
          });
      } else if (message.type === 'answer') {
        this.peerConnection.setRemoteDescription(
          new RTCSessionDescription(message.payload)
        );
      } else if (message.type === 'ice-candidate') {
        this.peerConnection.addIceCandidate(
          new RTCIceCandidate(message.payload)
        );
      }
    }
  }

  setupDataChannel() {
    this.dataChannel.onopen = () => {
      console.log('Data channel is open and ready to send messages.');
    };

    this.dataChannel.onmessage = (event) => {
      console.log('Received Message via Data Channel:', event.data);
    };

    this.dataChannel.onclose = () => {
      console.log('Data channel is closed.');
    };
  }

  public connect(): void {
    if (!this.peerConnection) {
      this.createPeerConnection();
    }
  }

  public sendMessage(message: any): void {}

  public getMessage(): Subject<any> {
    return this.messageSubject;
  }

  public disconnect(): void {
    if (this.peerConnection) {
      this.peerConnection = undefined;
    }
  }
}
