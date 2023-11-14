/* eslint-disable prettier/prettier */
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';

import { SocketService } from './service';
import { Server, Socket } from 'socket.io';
import { SocketAuthDTO } from './dto/socket';
import { io } from "socket.io-client";

@WebSocketGateway({ cors: true, transports: ['websocket', 'polling'] })
export class SocketsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  private socket;

  constructor(private readonly socketService: SocketService) {
    this.socket = io('http://localhost:3006', {
      reconnectionDelayMax: 10000,
      auth: {
        token: "123"
      },
      query: {
        "my-key": "my-value"
      }
    }); // Specify the address of your Node.js WebSocket server
    // this.sendMessageToNodeApp('seth');
    this.getUserFromKYC('malin');
    this.requestUserFromNodeApp('11');
  }
  async handleConnection(socket: Socket) {
    if (socket.handshake.auth['token']) {
      const user = await this.socketService.getUserFromAuthToken(
        socket.handshake.auth['token'],
      );
      // console.log('handleConnection socket user',user )
      await this.socketService.socketRegisterUser(user, socket, 'online');
    } else {
      const user = this.socketService.getUserFromSocket(socket);
      if (user) {
        await this.socketService.socketRegisterUser(user, socket, 'online');
      }
    }
  }
  sendMessageToNodeApp(message: string) {
    this.socket.emit('get-user', message);
  }

  async getUserFromKYC(message: string)  {
    let user;
    try {
      const responses = await this.socket.emitWithAck("get-user", message);
      console.log('responses',responses); // one response per client
    } catch (e) {
      console.log('error',e); 
      // some clients did not acknowledge the event in the given delay
    }
  
    //  this.socket.emitWithAck('get-user', message, (err, responses) => {
    //   if (err) {
    //     // some clients did not acknowledge the event in the given delay
    //     console.log('err', err)
    //   } else {
    //     console.log(responses); // one response per client
    //     console.log('err', responses)

    //   }
    // }
    // );
  }

  @SubscribeMessage('recieve-user')
  async recieveUser(
    @MessageBody() socketAuthDTO: SocketAuthDTO,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log('recieve-user', socketAuthDTO)
  }


  @SubscribeMessage('notify-online-status')
  async notifyOnlineStatus(
    @MessageBody() socketAuthDTO: SocketAuthDTO,
    @ConnectedSocket() socket: Socket,
  ) {
    // console.log('socketAuthDTO', socketAuthDTO)
    let sender: any;
    const authenticatedClient = await this.socketService.getUserFromAuthToken(
      socketAuthDTO.clientAuth,
    );
    if (authenticatedClient) {
      sender = await this.socketService.socketRegisterUser(
        authenticatedClient,
        socket,
        socketAuthDTO.status,
      );
      const data = {
        socketID: sender.socketID,
        data: sender,
      };
      this.server.sockets
        .to(sender.socketID)
        .emit('update-online-status', JSON.stringify(data));
      return data;
    }
    return;
  }

  requestUserFromNodeApp(userId: string) {
    if (this.socket) {
      console.log(`socket userId: ${userId}`);
      this.socket.emit('getUserFromNodeApp', userId);
    }
  }
  private userFromNodeAppSubject = new Observable<any>((observer) => {
    this.server.on('userFromNodeApp', (user) => {
      observer.next(user);
    });
  });

  onUserFromNodeApp(callback: (user: any) => void) {
    this.userFromNodeAppSubject.subscribe(callback);
  }

}
