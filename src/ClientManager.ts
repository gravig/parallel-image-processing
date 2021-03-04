import { Socket } from "socket.io";

export class Client {
  public socket: Socket;
  private _isBusy: boolean;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  public isBusy = (): boolean => {
    return this._isBusy;
  };

  public setBusy = (value: boolean): void => {
    this._isBusy = value;
  };
}

export default class ClientManager {
  private clients: Client[] = [];

  public addClient = (client: Client) => {
    this.clients.push(client);
  };

  public removeClient = (client: Client) => {
    this.clients = this.clients.filter((c) => c !== client);
  };
}
