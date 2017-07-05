export default (text) => {
  const element = document.createElement('div');
  element.innerHTML = text;
  return element;
}
