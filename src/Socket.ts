import { io } from "socket.io-client";

export default class Socket {
  private static _instance: Socket;
  private ioSocket: any;

  private constructor() {
    this.ioSocket = io("http://localhost:3000");
  }

  public static get instance(): Socket {
    if (!Socket._instance) {
      Socket._instance = new Socket();
    }
    return Socket._instance;
  }

  public get socket() {
    return this.ioSocket;
  }
}