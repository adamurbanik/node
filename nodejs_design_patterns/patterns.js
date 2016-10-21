// Factory pattern
function createPerson(name) {
  var privateProperties = {};
  var person = {
    setName: function (name) {
      if (!name) throw new Error('A person must have a name');
      privateProperties.name = name;
    },
    getName: function () {
      return privateProperties.name;
    }
  };
  person.setName(name);
  return person;
}

// Decorator
function decorate(component) {
  var proto = Object.getPrototypeOf(component);

  function Decorator(component) {
    this.component = component;
  }
  Decorator.prototype = Object.create(proto);
  //new method
  Decorator.prototype.greetings = function () {
    //...
  };
  //delegated method
  Decorator.prototype.hello = function () {
    this.component.hello.apply(this.component, arguments);
  };
  return new Decorator(component);
}

//or Decorator
function decorate(component) {
  //new method
  component.greetings = function () {
    //...
  };
  return component;
}

