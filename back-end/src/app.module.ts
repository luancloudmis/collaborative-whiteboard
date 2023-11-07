import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {WebsocketGateway} from "./libs/websocket/websocket.gateway";
import {WebsocketModule} from "./libs/websocket/websocket.module";

@Module({
  imports: [WebsocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
