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

  public manipulateImage = (dataURL: string): Promise<unknown> =>
    new Promise((res) => {
      this.socket.emit("process-image", dataURL, (result: string) => {
        res(result);
      });
    });
}

export default class ClientManager {
  private queue: string[] = [];
  private clients: Client[] = [];

  public addClient = (client: Client): void => {
    this.clients.push(client);
  };

  public removeClient = (client: Client): void => {
    this.clients = this.clients.filter((c) => c !== client);
  };

  private getIdleClient = (): Client | null => {
    return this.clients.find((client: Client) => !client.isBusy());
  };

  public requestProcessing = (dataURL: string): Promise<unknown> =>
    new Promise((res) => {
      const client = this.getIdleClient();

      if (client) {
        client.manipulateImage(dataURL).then((image) => {
          res(image);
        });
      } else {
        // use queue
      }
    });
}
