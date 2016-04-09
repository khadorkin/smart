function setStyle( elem, propertyObject ) {
  for (const property in propertyObject) {
    if (!elem.style[property]) {
      elem.style[property] = propertyObject[property];
    }
  }
}

export default setStyle;
