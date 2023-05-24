export const XdvSetCustomPropertiesFromAttributesMixin = function (superclass) {

  return class extends superclass {
    xdvSetCustomProperties (attr) {
      const attributes = Object.assign({}, this.dataset)
      const attKeys = Object.keys(attributes)
      for(let i=0; i< attKeys.length; i++) {
        let attKey = attKeys[i]
        attKey.startsWith(attr) && this.renderRoot.host.style.setProperty(`--xdv-${this.kebabCase(attKey)}`, attributes[attKeys[i]] )      
      }
    }
  }
}