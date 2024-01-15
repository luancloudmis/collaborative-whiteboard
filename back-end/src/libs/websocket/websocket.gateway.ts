import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { v4 as uuid } from 'uuid';

@WebSocketGateway(6969, {
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  connections: { id: string; socket: Socket }[] = [];

  broadcastConnections() {
    const ids = this.connections.map((c) => c.id);
    this.server.emit('ids', ids);
  }

  handleConnection(client: Socket) {
    const id = `conn-${uuid()}`;
    this.connections.push({ id, socket: client });
    console.log(`${id} connected`);
    // Send the local id for the connection
    client.emit('connection', id);

    // Send the list of connection ids
    this.broadcastConnections();

    client.on('message', (message) => {
      for (const connection of this.connections) {
        if (connection.socket !== client) {
          connection.socket.emit('message', message);
        }
      }
    });
  }

  handleDisconnect(client: any): any {
    const index = this.connections.findIndex((c) => c.socket === client);
    this.connections.splice(index, 1);

    // Send the list of connection ids
    this.broadcastConnections();
  }
}
