import Observable from "./Observable";

export default interface Observer {
  update: (observable: Observable) => void;
}
