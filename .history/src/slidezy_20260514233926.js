function Slidezy(selector, options) {
  this.container = document.querySelector(selector);
  if (!this.container){
    console.error(`${selector} is not Container`);
    return;
  }
  this.opt = Object.assign({}, options);
//slidezy-track 
  this.slides = this.container.children;

  this.init();
}
Slidezy.prototype.init() = function(){
    this.container.classList.add("slidezy-wrapper");
    this.track = document.createElement("div");

    console.log(this.slides);
    
}
