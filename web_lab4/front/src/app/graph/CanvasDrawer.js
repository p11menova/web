export class CanvasDrawer {
  SIZE = 450;
  LINE_WIDTH = 1.3;
  TEXT_SIZE = 20;
  TEXT_MARGIN = 15;
  TEXT_LINE_HEIGHT = 3;
  COLOR_RED = "rgba(191,1,16,0.94)"
  COLOR_GREEN = "rgb(157,255,43)"


  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = `${this.TEXT_SIZE}px Soyuz Grotesk`
    this.graphX = null;
    this.graphY = null;


    this.canvas.addEventListener('click', (event) => this.parseClick(event));
  }



  redrawAll(r = 1, points = []) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGraph(r);
    this.drawAxes();
    this.setPointerAtDot(1);

    console.log(points)
    points.forEach(point => this.drawPoint(point.x, point.y, point.result))
  }

  drawAxes() {
    this.ctx.fillStyle = "black";
    this.drawArrow(-this.SIZE, this.SIZE / 2, this.SIZE, this.SIZE / 2);
    this.drawArrow(this.SIZE / 2, this.SIZE, this.SIZE / 2, 0);
  }

  drawGraph(r) {
    const totalPoints = 4;
    const pointInPixels = this.SIZE / totalPoints;
    this.ctx.fillStyle = "rgba(255,0,195,0.62)";

    this.ctx.beginPath();
    this.ctx.moveTo(this.SIZE / 2, this.SIZE / 2);
    this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2 - r/2 * pointInPixels);
    this.ctx.lineTo(this.SIZE / 2 - r * pointInPixels, this.SIZE / 2 - r/2 * pointInPixels);
    this.ctx.lineTo(this.SIZE / 2 - r * pointInPixels, this.SIZE / 2);
    this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(this.SIZE / 2, this.SIZE / 2);
    this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2 + r / 2 * pointInPixels);
    this.ctx.lineTo(this.SIZE / 2 + r / 2 * pointInPixels, this.SIZE / 2);
    this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(
      this.SIZE / 2,
      this.SIZE / 2,
      r / 2 * pointInPixels,

      Math.PI/2,
      0,
      true
    );
    this.ctx.moveTo(this.SIZE / 2, this.SIZE / 2);
    this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2 - r/2 * pointInPixels);
    this.ctx.lineTo(this.SIZE / 2 + r/2 * pointInPixels, this.SIZE / 2);
    this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2);
    this.ctx.fill();
  }

  setPointerAtDot(max_r = 1.5) {

    this.ctx.font = `bold ${this.TEXT_SIZE}px Arial`;

    const totalPoints = 4;
    const pointInPixels = this.SIZE / totalPoints;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(`${max_r}`, this.SIZE / 2 + pointInPixels * max_r, this.SIZE / 2 - this.TEXT_MARGIN);
    this.ctx.fillText(`${max_r}`, this.SIZE / 2 + this.TEXT_MARGIN, this.SIZE / 2 - pointInPixels * max_r);

    this.ctx.beginPath()
    this.ctx.lineWidth = this.LINE_WIDTH;
    this.ctx.moveTo(this.SIZE / 2 + pointInPixels * max_r, this.SIZE / 2 + this.TEXT_LINE_HEIGHT);
    this.ctx.lineTo(this.SIZE / 2 + pointInPixels * max_r, this.SIZE / 2 - this.TEXT_LINE_HEIGHT);
    this.ctx.moveTo(this.SIZE / 2 + this.TEXT_LINE_HEIGHT, this.SIZE / 2 - pointInPixels * max_r);
    this.ctx.lineTo(this.SIZE / 2 - this.TEXT_LINE_HEIGHT, this.SIZE / 2 - pointInPixels * max_r);
    this.ctx.stroke();
    // this.ctx.fillText(`-${max_r}`, this.SIZE / 2 - pointInPixels * max_r, this.SIZE / 2 - this.TEXT_MARGIN);
    // this.ctx.fillText(`-${max_r}`, this.SIZE / 2 + this.TEXT_MARGIN, this.SIZE / 2 + pointInPixels * max_r);
  }

  drawArrow(fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    this.ctx.beginPath();
    this.ctx.lineWidth = this.LINE_WIDTH;
    this.ctx.moveTo(fromx, fromy);
    this.ctx.lineTo(tox, toy);
    this.ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    this.ctx.moveTo(tox, toy);
    this.ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    this.ctx.stroke();
  }

  drawPoint(x, y, success) {
    console.log("draw point")
    console.log(x," ",y, success)
    x = parseFloat(x)
    y = parseFloat(y)
    this.ctx.fillStyle = success
      ? this.COLOR_GREEN
      : this.COLOR_RED;
    const totalPoints = 4;
    const pointInPixels = this.SIZE / totalPoints;
    this.ctx.beginPath();
    this.ctx.arc(
      this.SIZE / 2 + pointInPixels * x,
      this.SIZE / 2 - y * pointInPixels,
      5,
      0,
      Math.PI * 2,
    );
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.fillStyle = "black"
    this.ctx.lineWidth = 0.9
    this.ctx.arc(
      this.SIZE / 2 + pointInPixels * x,
      this.SIZE / 2 - y * pointInPixels,
      5,
      0,
      Math.PI * 2
    )
    this.ctx.stroke();
  }

  drawBOOM(x, y) {
    console.log("dra boom")
    const totalPoints = 4;
    const pointInPixels = this.SIZE / totalPoints;
    this.ctx.beginPath();
    const boomImage = new Image();
    boomImage.src = './resources/boom.png';
    boomImage.onload = () => {
      this.ctx.drawImage(
        boomImage,
        this.SIZE / 2 + pointInPixels * x - 45,
        this.SIZE / 2 - y * pointInPixels - 45,
        90,
        90
      );
    }
  }

  parseClick(event) {
    console.log("балять нажали на график")
    const rect = this.canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left; // x position in canvas
    const clickY = event.clientY - rect.top;  // y position in canvas

    let graphX = (clickX - this.SIZE / 2 ) / (this.SIZE / 4); // scale to graph unit
    let graphY = -(clickY - this.SIZE / 2 ) / (this.SIZE / 4); // invert y-axis

    graphX = parseFloat(graphX.toFixed(3))
    graphY = parseFloat(graphY.toFixed(3))

    this.graphX = graphX;
    this.graphY = graphY;
    console.log(this.graphX, this.graphY)
  }
  getGraphValues(){
    console.log("да забирайте эти клики по канвасу")
    return [this.graphX, this.graphY]
  }

}
