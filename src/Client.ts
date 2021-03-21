import { Socket } from "socket.io";
import c from "chalk";

export default class Client {
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

  public manipulateImage = (dataURL: string): Promise<unknown> => {
    return new Promise((res) => {
      this.socket.emit("process-image", dataURL, (result: string) => {
        res(result);
      });
    });
  };

  public toString = (): string => {
    const isBusy = this._isBusy;

    return c`{blue [CLIENT]} {whiteBright ${this.socket.id}} {${
      isBusy ? "red.bold" : "green.bold"
    } ${isBusy ? "BUSY" : "IDLE"}}`;
  };
}
