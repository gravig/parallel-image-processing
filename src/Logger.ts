/* eslint-disable no-console */
import ClientManager from "./ClientManager";
import Client from "./Client";
import Observable from "./lib/Observable";
import Observer from "./lib/Observer";
import c from "chalk";

export default class Logger implements Observer {
  private WIDTH = 80;

  public update = (observable: Observable): void => {
    const manager = observable as ClientManager;
    const clients = manager.getClients();

    this.printState(clients);
  };

  private printState = (clients: Client[]): void => {
    console.clear();
    this.line();
    this.stats(clients);
    this.line();
    this.clients(clients);
    this.line();
  };

  private stats = (clients: Client[]): void => {
    const busyClientCount = clients.filter((c) => c.isBusy()).length;

    this.text(c`{blue.bold.underline STATS}`, "center");
    this.text(c`IDLE CLIENTS {green ${clients.length}}`);
    this.text(
      c`CURRENT LOAD {green ${(busyClientCount / clients.length) * 100}%}`
    );
  };

  private clients = (clients: Client[]): void => {
    this.text(c`{blue.bold.underline CLIENTS}`, "center");
    clients.forEach((client) => {
      console.log(client.toString());
    });
  };

  private line = () => {
    const { WIDTH } = this;

    console.log("=".repeat(WIDTH));
  };

  private text = (
    text: string,
    position: "left" | "center" | "right" = "left"
  ) => {
    const parsed = text.replace(
      // eslint-disable-next-line no-control-regex
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      ""
    );
    const { WIDTH } = this;

    if (position === "left") {
      console.log(text);
    } else if (position === "center") {
      console.log(" ".repeat(WIDTH / 2 - parsed.length / 2) + text);
    } else if (position === "right") {
      console.log(" ".repeat(WIDTH - parsed.length) + text);
    }
  };
}
