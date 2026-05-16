function Slidezy(selector, options) {
  this.container = document.querySelector(selector);
  if (!this.container) {
    console.error(`${selector} is not Container`);
    return;
  }
  this.opt = Object.assign({}, options);
  //slidezy-track
  this.slides = Array.from(this.container.children);

  this.init();
}
Slidezy.prototype.init = function () {
  this.container.classList.add("slidezy-wrapper");
  this.createTrack();
  this.createNavigation();
};
Slidezy.prototype.createTrack = function () {
  this.track = document.createElement("div");

  this.track.className = "slidezy-track";
  this.slides.forEach((track) => {
    this.track.className = "slidezy-slide";
    this.track.appendChild(track);
  });

  this.container.appendChild(this.track);
};
Slidezy.prototype.createNavigation = function () {
  this.prevbtn = document.createElement("button");
  this.nextbtn = document.createElement("button");

  this.prevbtn.textContent = "<";
  this.nextbtn.textContent = ">";

  this.prevbtn.classList.add("slidezy-prev");
  this.nextbtn.classList.add("slidezy-next");

  this.container.append(this.prevbtn, this.nextbtn);
  this.prevbtn.onclick = () => this.moveSlide(-1);
  this.nextbtn.onclick = () => this.moveSlide(1);
};
Slidezy.prototype.moveSlide = function (step) {
  console.log(step);
};
