/* eslint-disable prettier/prettier */
import { Socket } from "socket.io";
/* eslint-disable prettier/prettier */


export class SocketPayloadDTO {
    clientAuth: string;
    status: string;
    payload: string
    bookingType: string;
    providerID: string;
    clientID: string;
  }
  export class SocketAuthDTO {
    clientAuth: string;
    status: string;
    order: string
    bookingType: string;
    providerID: string;
    clientID: string;
  }
  
  export class PlaceOrderSocketDTO {
    clientAuth: string;
    orderID: string;
    commodityID: string;
    commodityWeight: string;
    orderType: string;
    clientID: string;
    providerID: string;
    order: string
  }
  
  export class SocketCallDTO {
    socket: Socket;
    clientAuth: string;
    data: string;
    service: string; 
    payload: string;
  }