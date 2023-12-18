import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(5000, {
  cors: {
    origin: '*',
  },
})
export class SignalingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  connections: { id: string; socket: Socket }[] = [];

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.connections.push({ id: client.id, socket: client });
    console.log('Server connections:', this.connections.length);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connections = this.connections.filter((obj) => obj.id !== client.id);
  }

  @SubscribeMessage('offer')
  handleOffer(@MessageBody() offer: any, @ConnectedSocket() client: Socket) {
    client.broadcast.emit('message', { type: 'offer', payload: offer });
  }

  @SubscribeMessage('answer')
  handleAnswer(@MessageBody() answer: any, @ConnectedSocket() client: Socket) {
    client.broadcast.emit('message', { type: 'answer', payload: answer });
  }

  @SubscribeMessage('ice-candidate')
  handleICECandidate(
    @MessageBody() candidate: any,
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.emit('message', {
      type: 'ice-candidate',
      payload: candidate,
    });
  }
}
