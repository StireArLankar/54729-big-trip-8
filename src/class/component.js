class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
  }

  get reference() {
    return this._ref;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._ref = this.template;
    this.bind();
    return this._ref;
  }

  bind() {}

  unbind() {}

  unrender() {
    this.unbind();
    this._ref.remove();
    this._ref = null;
  }
}

export default Component;
