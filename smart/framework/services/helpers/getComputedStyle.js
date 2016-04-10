function getComputedStyle(elem) {
  return window.getComputedStyle ? getComputedStyle(elem, '') : elem.currentStyle;
}

export default getComputedStyle;
