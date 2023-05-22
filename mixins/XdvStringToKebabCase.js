export const XdvStringToKebabCase = function (superclass) {

  return class extends superclass {
    kebabCase (str) {
      return str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .join('-')
        .toLowerCase();
    }
  }
}
