import { Injectable } from '@nestjs/common';
import { SocketsGateway } from './gateway';
import { Socket } from 'socket.io';
import { Observable } from 'rxjs';

@Injectable()
export class KYCService {
    constructor(private readonly kycSocketGateway: SocketsGateway) { 
        this.getUserById('1');
     }
    sendMessage(message: string) {
        this.kycSocketGateway.sendMessageToNodeApp(message);
    }
    async getUserFromSocket(socket: Socket) {
        let newUser: any;
        const token = socket.handshake.headers.cookie != null ? socket.handshake.headers.cookie : socket.handshake.query['token']
        if (token) {
            newUser = this.kycSocketGateway.getUserFromKYC('');
        }
        return newUser;
    }
    getUserById(userId: string): Observable<any> {
        return new Observable((observer) => {
            // Emit a request to the Node.js app to get the user data
            this.kycSocketGateway.requestUserFromNodeApp(userId);

            // Listen for the response from the Node.js app
            this.kycSocketGateway.onUserFromNodeApp((user) => {
                observer.next(user);
                observer.complete();
            });
        });
    }
    async getUserFromAuthToken(authToken: string) {
        if (authToken) {
            const authUser: any = this.kycSocketGateway.getUserFromKYC('');
            if (authUser) {
                return authUser;
            } else { return }
        }
    }
}