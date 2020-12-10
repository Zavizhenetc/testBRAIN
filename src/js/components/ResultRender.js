export default class ResultRender{
constructor(width, template){
  this.template = template;
  this.width = width;
  // this.title = title;
}
createBar() {
  this.container = this.template.cloneNode(true);
  this.container.querySelector('.result__bar').setAttribute('style', `width: ${this.width }%`);
  this.container.querySelector('.result__bar-digit').textContent =`${this.width}% ` ;
  // this.container.querySelector('.result__bar').textContent = ` ${this.title }%`;
  return this.container;

}
_addBar(elem) {
  this.container.append(elem);
}
render(array) {
  array.forEach((elem) => this._addBar(elem));
}
}