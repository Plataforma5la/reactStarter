const s = require('./estilo.styl');
console.log(s);
export default (text) => {
  const element = document.createElement('div');
  element.innerHTML = text;
  element.className += s.prueba;
  return element;
}
