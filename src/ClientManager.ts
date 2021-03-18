import { cloneDeep } from "lodash";
import Client from "./Client";
import Observable from "./lib/Observable";
import Observer from "./lib/Observer";

export default class ClientManager extends Observable {
  private queue: string[] = [];
  private clients: Client[] = [];

  public addClient = (client: Client): void => {
    this.clients.push(client);
    this.notify();
  };

  public getClients = (): Client[] => {
    return cloneDeep(this.clients);
  };

  public removeClient = (client: Client): void => {
    this.clients = this.clients.filter((c) => c !== client);
    this.notify();
  };

  private getIdleClient = (): Client | null => {
    return this.clients.find((client: Client) => !client.isBusy());
  };

  public useLogger = (logger: Observer): void => {
    if (this.hasObserver(logger)) return;

    this.subscribe(logger);
  };

  public requestProcessing = (dataURL: string): Promise<unknown> =>
    new Promise((res) => {
      const client = this.getIdleClient();

      if (client) {
        client.manipulateImage(dataURL).then((image) => {
          res(image);
          this.notify();
        });
      } else {
        // use queue
      }
      this.notify();
    });
}
