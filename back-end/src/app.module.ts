import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketModule } from './libs/websocket/websocket.module';

@Module({
  imports: [WebsocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
