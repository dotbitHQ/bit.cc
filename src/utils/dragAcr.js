export default class DragAcr {
  constructor(param) {
    this.initParam(param)
    this.draw(this.value)
  }
  initParam(param) {
    const {
      el,
      startDeg = 0,
      endDeg = 1,
      innerColor = "green",
      outColor = "#000000",
      innerLineWidth = 1,
      outLineWidth = 20,
      counterclockwise = true,
      slider = 10,
      color = ["#FF7F00", "#FFE864"],
      sliderColor = "#fff",
      sliderBorderColor = "#FF7F00",
      value = 0,
      change = (v) => { console.log(v) },
      changeEnd = (v) => { console.log(v) },
      inCircleCallback = (v) => { console.log(v) },
      textShow = true
    } = param;

    this.el = el;
    this.width = el.offsetWidth;
    this.height = el.offsetHeight;
    this.styleWidth = el.offsetWidth;
    this.styleHeight = el.offsetHeight;
    this.center = this.width / 2
    this.radius = this.width / 2 - 7;
    this.isMove = false


    this.startDeg = startDeg;
    this.endDeg = endDeg;
    this.innerColor = innerColor;
    this.outColor = outColor;
    this.innerLineWidth = innerLineWidth;
    this.outLineWidth = outLineWidth;
    this.counterclockwise = counterclockwise;
    this.slider = slider;
    this.color = color;
    this.sliderColor = sliderColor;
    this.sliderBorderColor = sliderBorderColor;
    this.value = value;
    this.textShow = textShow;
    this.initCanvas(el);


    this.change = change;
    this.changeEnd = changeEnd;
    this.inCircleCallback = inCircleCallback;

    this.isDown = false;
    this.event(el)

  }
  initCanvas(dom) {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "dragArc");
    this.ctx = this.canvas.getContext("2d");
    const ratio = 3
    this.canvas.setAttribute("width", this.width * ratio);
    this.canvas.setAttribute("height", this.width * ratio);
    this.canvas.setAttribute("style", `width: ${this.styleWidth}px; height: ${this.styleWidth}px; `);

    this.ctx.scale(ratio, ratio)


    dom.appendChild(this.canvas);
    this.isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
  }

  draw(value) {
    this.ctx.clearRect(0, 0, this.width, this.width);

    this.ctx.save();

    let startDeg = this.counterclockwise ? Math.PI * (2 - this.startDeg) : Math.PI * this.startDeg
    let endDeg = this.counterclockwise ? Math.PI * (2 - this.endDeg) : Math.PI * this.endDeg
    let Deg = this.valToDeg(value)


    let themeColor = (typeof this.color == 'String') ? this.color : this.setLinearGradient()
    this.ctx.beginPath();
    this.ctx.arc(this.center, this.center, this.radius, startDeg, Deg, this.counterclockwise); // 可变圆弧
    this.ctx.strokeStyle = themeColor;
    this.ctx.lineCap = "round";
    this.ctx.lineWidth = this.outLineWidth;
    this.ctx.stroke();


    this.P = this.DegToXY(Deg)
    if (this.isMove) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.center, this.center,);
      this.ctx.arc(this.P.x, this.P.y, this.slider + 1.5, 0, Math.PI * 2, false); // 绘制滑块内侧
      this.ctx.fillStyle = this.sliderBorderColor;
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.moveTo(this.center, this.center);
      this.ctx.arc(this.P.x, this.P.y, this.slider, 0, Math.PI * 2, false); // 绘制滑块
      this.ctx.fillStyle = this.sliderColor;;
      this.ctx.fill();
    }

    if (!this.textShow) return;
    this.ctx.font = `${this.center / 4}px serif`;
    this.ctx.fillStyle = themeColor;
    this.ctx.textAlign = "center"
    this.ctx.textBaseline = "bottom";
    this.ctx.fillText(this.value, this.center, this.center);


  }

  getPixelRatio(context) {
    var backingStore = context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
  }
  //将值转化为弧度
  valToDeg(v) {
    let range = this.endDeg - this.startDeg;
    let val = range / 100 * v;
    if (this.counterclockwise && (val != 0)) val = 2 - val;
    let startDeg = this.counterclockwise ? (2 - this.startDeg) : this.startDeg;
    return (startDeg + val) * Math.PI;
  }
  // 弧度转化为对应坐标值
  DegToXY(deg) {
    let d = 2 * Math.PI - deg;
    return this.respotchangeXY({
      x: this.radius * Math.cos(d),
      y: this.radius * Math.sin(d)
    })
  }

  // Canvas coordinates are converted to center coordinates
  spotchangeXY(point) {
    const spotchangeX = (i) => {
      return i - this.center
    }
    const spotchangeY = (i) => {
      return this.center - i
    }
    return {
      x: spotchangeX(point.x),
      y: spotchangeY(point.y)
    }
  }

  // Center coordinates are converted to canvas coordinates
  respotchangeXY(point) {
    const spotchangeX = (i) => {
      return i + this.center
    }
    const spotchangeY = (i) => {
      return this.center - i
    }
    return {
      x: spotchangeX(point.x),
      y: spotchangeY(point.y)
    }
  }

  setLinearGradient() {
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.width);
    this.color.forEach((e, i) => {
      if (i == 0) {
        grad.addColorStop(0, e)
      } else if (i == this.color.length - 1) {
        grad.addColorStop(1, e)
      } else {
        grad.addColorStop(1 / this.color.length * (i + 1), e);
      }
    });
    return grad;
  }

  event(dom) {
    if (this.isMobile) {
      dom.addEventListener("touchstart", this.OnMouseDown.bind(this), false);
      dom.addEventListener("touchmove", this.throttle(this.OnMouseMove.bind(this)), false);
      dom.addEventListener("touchend", this.OnMouseUp.bind(this), false);
      return
    }
    dom.addEventListener("mousedown", this.OnMouseDown.bind(this), false);
    dom.addEventListener("mousemove", this.throttle(this.OnMouseMove.bind(this)), false);
    dom.addEventListener("mouseup", this.OnMouseUp.bind(this), false);
    dom.addEventListener("mouseout", this.OnMouseOut.bind(this), false);

  }

  OnMouseMove(evt) {
    let evpoint = {};
    evpoint.x = this.getx(evt);
    evpoint.y = this.gety(evt);
    const isInRing = this.isInRing(evpoint.x, evpoint.y)
    this.isMove = isInRing
    if (!this.isDown) return;
    let point = this.spotchangeXY(evpoint);
    let deg = this.XYToDeg(point.x, point.y);
    deg = this.counterclockwise ? deg : Math.PI * 2 - deg;
    let val = (deg / Math.PI - this.startDeg) / (this.endDeg - this.startDeg) * 100
    if (val < 0) val = 100 + val;
    if (val >= 100) val = 100;
    if (val <= 0) val = 0;
    if (Math.abs(val - this.value) > 10) return;
    this.animate = requestAnimationFrame(this.draw.bind(this, val));

    this.isMove = true
    if (this.value != Math.round(val)) {
      this.value = Math.round(val);
      this.change(this.value)
    }
  }

  OnMouseDown(evt) {
    let range = 3;
    let X = this.getx(evt);
    let Y = this.gety(evt);
    let P = this.P
    let minX = P.x - this.slider - range;
    let maxX = P.x + this.slider + range;
    let minY = P.y - this.slider - range;
    let maxY = P.y + this.slider + range;

    if (minX < X && X < maxX && minY < Y && Y < maxY) {
      this.isDown = true;
    } else {
      this.isDown = false;
      const inCircle = this.isInCircle(X, Y)
      if (inCircle) {
        this.inCircleCallback()
      } else {
        for (let i = 0; i < 100; i++) {
          const R = this.DegToXY(this.valToDeg(i))
          let minRX = R.x - range;
          let maxRX = R.x + range;
          let minRY = R.y - range;
          let maxRY = R.y + range;
          if (minRX < X && X < maxRX && minRY < Y && Y < maxRY) {   // Determine if the mouse is over the slider
            this.animate = requestAnimationFrame(this.draw.bind(this, i));
            this.changeEnd(i)
            this.value = i
            return
          }
        }
      }

    }
  }

  // Set the position of the slider
  setValue(value) {
    this.value = value
    this.animate = requestAnimationFrame(this.draw.bind(this, value));
  }

  // Determine if a point is inside a circle
  isInCircle(x, y) {
    const a = this.center
    const b = this.center
    let dis = Math.sqrt((x - a) * (x - a) + (y - b) * (y - b))
    return dis <= this.radius - 5
  }

  // Determine whether the point is on the circle line
  isInRing(x, y) {
    let range = 4
    const a = this.center
    const b = this.center
    let dis = Math.sqrt((x - a) * (x - a) + (y - b) * (y - b))
    return dis <= this.radius + range && dis >= this.radius - range
  }



  OnMouseUp() {
    const _this = this
    this.isMove = false
    cancelAnimationFrame(_this.animate);
    if (this.isDown) {
      this.changeEnd(this.value)
    }
    this.isDown = false
  }

  OnMouseOut() {
    this.isMove = false
    cancelAnimationFrame(this.animate);
    if (this.isDown) {
      this.changeEnd(this.value)
    }
    this.isDown = false
  }

  XYToDeg(lx, ly) {
    let adeg = Math.atan(ly / lx)
    let deg;
    if (lx >= 0 && ly >= 0) {
      deg = adeg;
    }
    if (lx <= 0 && ly >= 0) {
      deg = adeg + Math.PI;
    }
    if (lx <= 0 && ly <= 0) {
      deg = adeg + Math.PI;
    }
    if (lx > 0 && ly < 0) {
      deg = adeg + Math.PI * 2;
    }
    return deg
  }

  getx(ev) {
    if (!this.isMobile) return ev.clientX - this.el.getBoundingClientRect().left;
    return ev.touches[0].pageX - this.el.getBoundingClientRect().left;
  }

  gety(ev) {
    if (!this.isMobile) return ev.clientY - this.el.getBoundingClientRect().top;
    return ev.touches[0].pageY - this.el.getBoundingClientRect().top;
  }

  throttle(func) {
    let previous = 0;
    return function () {
      let now = Date.now();
      let context = this;
      let args = arguments;
      if (now - previous > 10) {
        func.apply(context, args);
        previous = now;
      }
    }
  }
}
