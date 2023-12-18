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
    this.webSocketService.connect(() => {
      this.peerConnection = new RTCPeerConnection();
      this.peerConnection.ondatachannel = (event) => {
        // Handle data channel creation
        this.dataChannel = event.channel;
        this.setupDataChannel();
        // ...
      };

      this.peerConnection.onicecandidate = (event) => {
        // Handle ICE candidate generation
        // ...
        if (event.candidate) {
          // Send ICE candidate to the remote peer via WebSocket
          this.webSocketService.sendICECandidate(event.candidate);
        }
      };

      this.webSocketService.getMessage().subscribe((message: any) => {
        console.log('message', message);
        this.handleSignalingMessage(message);
      });
    });
    // Other event handlers and setup for the peer connection
  }

  handleSignalingMessage(message: any) {
    // Process signaling messages received from the WebSocket
    // Handle offer, answer, and ICE candidates
    // ...

    // For example:
    if (this.peerConnection) {
      if (message.type === 'offer') {
        this.peerConnection.setRemoteDescription(
          new RTCSessionDescription(message)
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
          new RTCSessionDescription(message)
        );
      } else if (message.type === 'ice-candidate') {
        this.peerConnection.addIceCandidate(
          new RTCIceCandidate(message.candidate)
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

  public sendMessage(message: any): void {
    // Check if data channel exists and send the message
    // ...
  }

  public getMessage(): Subject<any> {
    return this.messageSubject;
  }

  public disconnect(): void {
    if (this.peerConnection) {
      // Disconnect the peer connection
      // ...
      this.peerConnection = undefined;
    }
  }
}
