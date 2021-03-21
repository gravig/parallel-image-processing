import { cloneDeep } from "lodash";
import Client from "./Client";
import Observable from "./lib/Observable";
import Observer from "./lib/Observer";

export default class ClientManager extends Observable {
  private queue: (() => void)[] = [];
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

  private useStackProcessing = (dataUrl: string, done) => {
    const client = this.getIdleClient();

    if (client) {
      client.setBusy(true);
      client.manipulateImage(dataUrl).then((image) => {
        client.setBusy(false);
        if (this.queue.length > 0) {
          const fn = this.queue[0];
          this.queue = this.queue.filter((_, i) => i !== 0);
          fn();
        }
        this.notify();
        done(image);
      });
    } else {
      this.queue.push(() => this.useStackProcessing(dataUrl, done));
    }
    this.notify();
  };

  public requestProcessing = (dataUrl: string): Promise<unknown> =>
    new Promise((res) => {
      this.useStackProcessing(dataUrl, res);
    });
}
