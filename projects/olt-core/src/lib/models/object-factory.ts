export class ObjectFactory {
  create<T>(type: (new () => T)): T {
    return new type();
  }
}
