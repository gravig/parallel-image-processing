import http from "http";
import c from "chalk";
import express, { Express } from "express";
import IO from "socket.io";
import ClientManager from "./ClientManager";
import Client from "./Client";
import Logger from "./Logger";

export default class App {
  private manager: ClientManager = new ClientManager();
  private express: Express;
  private server: http.Server;
  private io: IO.Server;

  public getServer = (): http.Server => {
    return this.server;
  };

  constructor() {
    this.express = express();
    this.server = new http.Server(this.express);
    this.io = new IO.Server(this.server, {
      cors: {
        origin: "*",
      },
    });
    // = Serve static files =
    this.express.use("/", express.static("public"));

    this.manager.useLogger(new Logger());
    this.mountSocketListeners();
  }

  private mountSocketListeners = () => {
    const manager = this.manager;
    const io = this.io;

    io.on("connection", (socket: IO.Socket) => {
      const client = new Client(socket);
      manager.addClient(client);

      // = Handle processing request =
      socket.on("image", (image, callback) => {
        manager.requestProcessing(image).then((result) => {
          callback(result);
        });
      });

      // = Handle disconnection =
      socket.on("disconnect", () => {
        manager.removeClient(client);
      });
    });
  };
}
