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
};
Slidezy.prototype.createTrack = function () {
  this.track = document.createElement("div");

  this.track.className = "slidezy-track";
  this.slides.forEach((track) => {
    this.track.appendChild(track);
  });

  this.container.appendChild(this.track);
};
