/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConnectedUser } from './entities/connected-user.entity';
import {AsklessClient} from "askless-js-client/node";
@Injectable()
export class SocketService {
  constructor(
    @InjectRepository(ConnectedUser)
    private readonly connectedUserRepository: Repository<ConnectedUser>,
  ) {
  }


  async socketRegisterUser(user, socket: Socket, status: string) {
    try {
      // console.log('socketRegisterUser. socket.user', user);
      const userConnected = await this.connectedUserRepository.findOne({ where: { userId: user.userId } })
      // console.log('new socket connection',user)

      if (userConnected) {
        if (status == 'offline') {
          // console.log('user connection status', status);
          userConnected.currentConnectionStatus = 'offline'
          userConnected.isOnline = false
          userConnected.socketID = null
          await this.connectedUserRepository.update(userConnected.connectionID, userConnected);
          const data = await this.connectedUserRepository.findOne({ where: { connectionID: userConnected.connectionID } })
          // console.log('updated socketRegisterUser. connection', data);
          return data;
        } else {
          // console.log('user connection status', status);
          if(userConnected.socketID != socket.id){
            // console.log(`updating socketRegisterUser. from ${userConnected.socketID} to ${ socket.id}`);
            userConnected.currentConnectionStatus = 'online'
            userConnected.isOnline = true
            userConnected.socketID = socket.id
            await this.connectedUserRepository.update(userConnected.connectionID, userConnected);
            const data = await this.connectedUserRepository.findOne({ where: { userId: user.userId } })
            // console.log('updated socketRegisterUser. connection', data);
            return data;
          }
          return userConnected;

        }
      } else {
        // console.log('socketRegisterUser. user does not exist');
        const connection = {
          socketID: socket.id,
          userId: user.userId,
          currentConnectionStatus: 'online',
          isOnline: true
        }
        // console.log('socketRegisterUser. user does not Exist connection',connection);
        const newConnection = this.connectedUserRepository.create(connection);
                              await this.connectedUserRepository.save(newConnection);
        const savedConnection = await this.connectedUserRepository.findOne({ where: { userId: user.userId } })
        // console.log('socketRegisterUser. savedConnection socket.id', savedConnection);
        return savedConnection;
      }
    } catch (error) {

    }
  }
  async findConnectedUsers():Promise<ConnectedUser[]> {
      const data = await this.connectedUserRepository.find({ where: { isOnline: true, currentConnectionStatus: 'online' }, })
          if (data) {
        return data;
      }
      return null;
    }
  async findConnectedUser(userId: string
  ) {
    const data = await this.connectedUserRepository.findOne({ where: { userId: userId, currentConnectionStatus: 'online' }, })
        if (data) {
      return data;
    }
    return null;
  }
  // async handleAuthentication(
  //   clientAuth: string,
  //   socket: Socket,
  //   status: string,
  // ) {
  //   const user = await this.getUserFromAuthToken(clientAuth);
  //   if (user) {
  //     const client = await this.socketRegisterUser(user, socket, status);
  //     return client;
  //   }
  //   return null;
  // }

  async getUserFromSocket(socket: Socket) {
    let newUser: any;
    const token = socket.handshake.headers.cookie != null ? socket.handshake.headers.cookie : socket.handshake.query['token']
    if (token) {
      newUser = await AsklessClient.instance.read({route:'', query:{authToken:token},neverTimeout: false});
    }
    return newUser;
  }

  async getUserFromAuthToken(authToken: string) {
    let newUser;
    if (authToken) {
      // console.log('getUserFromAuthToken token', authToken)

     const authUser = await AsklessClient.instance.read({route:'', query:{authToken: authToken},neverTimeout: false});
     if(authUser){
      return authUser;
     }else{return}
    }
  }

  // async getUserByID(recieverID: string) {
  //   let newUser:any;
  //    if(recieverID){
  //     newUser =  await AsklessClient.instance.read({route:'', query:{"userId": recieverID},neverTimeout: false});
  //     return newUser;
  //    }else{return}
  // }
}