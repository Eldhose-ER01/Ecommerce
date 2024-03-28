//Subscribe Architechture Using category filtering
class CatObservable {
  constructor() {
    this.observer = [];
  }

  subscribe(func) {
    this.observer.push(func);
  }

  unsubscribe(func) {
    this.observer.filter((fn) => fn !== func);
  }

  notify(clicked = 0) {
    if (clicked) {
      this.observer.forEach((observer) => {
        observer(clicked);
      });
    }
  }
}

export default new CatObservable();
