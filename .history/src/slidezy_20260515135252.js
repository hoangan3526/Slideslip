function Slidezy(selector, options = {}) {
  this.container = document.querySelector(selector);
  if (!this.container) {
    console.error(`${selector} is not Container`);
    return;
  }
  this.opt = Object.assign({}, options);
  //slidezy-track
  this.slides = Array.from(this.container.children);
  this.currentIndex = 0;
  this.opt = Object.assign(
    {
      items: 1,
      loop: false,
    },
    options,
  );
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
  this.slideHead = this.slides
    .slice(-this.opt.items)
    .map((node) => node.cloneNode(true).innerText);
  this.slideTail = this.slides
    .slice(0, this.opt.items)
    .map((node) => node.cloneNode(true).innerText);

  this.slides.forEach((track) => {
    track.className = "slidezy-slide";
    track.style.flexBasis = `calc(100% / ${this.opt.items})`;

    this.track.appendChild(track);
  });
  this.slideHead.concat(this.track.concat(this.slideTail));
  console.log(this.track);

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
  if (this.opt.loop) {
    this.currentIndex =
      (this.currentIndex + step + this.slides.length) % this.slides.length;
  } else {
    this.currentIndex = Math.min(
      Math.max(this.currentIndex + step, 0),
      this.slides.length - this.opt.items,
    );
    console.log(this.currentIndex);
  }
  this.offset = this.currentIndex * -(100 / this.opt.items);
  console.log(this.offset);

  this.track.style.transform = `translateX(${this.offset}%)`;
};
