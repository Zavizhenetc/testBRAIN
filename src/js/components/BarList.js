export default class BarList{
constructor(container){
  this.container = container;

}

_addBar(bar) {
  this.container.append(bar);
}

render(array) {
  array.forEach((elem) => this._addBar(elem));
}
remove() {
  this.container.innerHTML = '';
}
}