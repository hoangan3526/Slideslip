function Slidezy(selector, options = {}) {
  this.container = document.querySelector(selector);
  if (!this.container) {
    console.error(`${selector} is not Container`);
    return;
  }
  this.opt = Object.assign({}, options);
  //slidezy-track
  this.slides = Array.from(this.container.children);
  this.opt = Object.assign(
    {
      items: 1,
      loop: false,
      speed: 300,
      nav: true,
    },
    options,
  );
  this.currentIndex = 0;

  this.currentIndex = this.opt.loop ? this.opt.items : 0;

  this.init();
  this._updatePosition();
}
Slidezy.prototype.init = function () {
  this.container.classList.add("slidezy-wrapper");
  this.createTrack();
  this.createControls();
  if (this.opt.nav) {
    this.createNav();
  }
};
Slidezy.prototype.createTrack = function () {
  this.track = document.createElement("div");

  this.track.className = "slidezy-track";

  if (this.opt.loop) {
    this.slideHead = this.slides
      .slice(-this.opt.items)
      .map((node) => node.cloneNode(true));
    this.slideTail = this.slides
      .slice(0, this.opt.items)
      .map((node) => node.cloneNode(true));
    this.slides = this.slideHead.concat(this.slides.concat(this.slideTail));
  }

  this.slides.forEach((track) => {
    track.classList.add("slidezy-slide");
    track.style.flexBasis = `calc(100% / ${this.opt.items})`;
    this.track.appendChild(track);
  });

  this.container.appendChild(this.track);
};
Slidezy.prototype.createNav = function () {
  this.navWrapper = document.createElement("div");
  this.navWrapper.className = "slidezy-nav";

  const slidesCount =
    this.slides.length - (this.opt.loop ? this.opt.items * 2 : 0);

  const pageCount = Math.ceil(slidesCount / this.opt.items);
  for (let i = 0; i < pageCount; i++) {
    const dot = document.createElement("button");
    dot.className = "slidezy-dot";
    if (i === 0) {
      dot.classList.add("active");
    }
  }
  this.container.append(this.navWrapper);
};
Slidezy.prototype.createControls = function () {
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
  if (this._isAnimating) return;
  this._isAnimating = true;

  const maxIndex = this.slides.length - this.opt.items;

  this.currentIndex = Math.min(Math.max(this.currentIndex + step, 0), maxIndex);

  setTimeout(() => {
    if (this.opt.loop) {
      if (this.currentIndex <= 0) {
        this.currentIndex = maxIndex - this.opt.items;
      } else if (this.currentIndex >= maxIndex) {
        this.currentIndex = this.opt.items;
      }
      this._updatePosition(true);
    }
    this._isAnimating = false;
  }, this.opt.speed);

  this._updatePosition();
};
Slidezy.prototype._updatePosition = function (instant = false) {
  this.track.style.transition = instant
    ? "none"
    : `transform ${this.opt.speed}ms ease-in-out`;
  this.offset = this.currentIndex * -(100 / this.opt.items);

  this.track.style.transform = `translateX(${this.offset}%)`;
};
// 4 5 6 1 2 3 4 5 6 1 2 3
// 0 1 2 3 4 5 6 7 8 9 10 11
