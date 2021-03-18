import Observer from "./Observer";

export default class Observable {
  private observers: Observer[] = [];

  public hasObserver = (o: Observer): boolean => this.observers.includes(o);

  public subscribe = (observer: Observer): void => {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  };

  public unsubscribe = (observer: Observer): void => {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter((o) => o !== observer);
    }
  };

  public notify = (): void => {
    this.observers.forEach((observer) => observer.update(this));
  };
}
