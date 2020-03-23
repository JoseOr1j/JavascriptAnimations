const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const getRandomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const TOTAL_POINTS = 20;
const CONNECT_DISTANCE = 100;

let points = [];

const drawPoint = point => {
  ctx.beginPath();
  ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
  ctx.fill();
};

const movePoint = point => {
  point.x += point.s * Math.cos(point.a);
  point.y += point.s * Math.sin(point.a);
};

const distance = (point, other) => {
  return Math.sqrt((other.x - point.x) ** 2 + (other.y - point.y) ** 2);
};

const drawLine = (point, other, d) => {
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(other.x, other.y);
  ctx.strokeStyle = `rgba(0, 0, 0, ${Math.abs(d / CONNECT_DISTANCE - 1)})`;
  ctx.stroke();
};

const loop = () => {
  window.requestAnimationFrame(loop);

  for (let i = points.length; i < TOTAL_POINTS; i++) {
    points.push({
      x: getRandomInRange(0, canvas.width),
      y: getRandomInRange(0, canvas.height),
      a: getRandomInRange(0, 360),
      s: 1
    });
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  points.forEach(point => {
    movePoint(point);
  });

  points = points.filter(point => {
    return (
      point.x >= 0 &&
      point.x < canvas.width &&
      point.y >= 0 &&
      point.y < canvas.height
    );
  });

  points.forEach(point => {
    drawPoint(point);
  });

  points.forEach(point => {
    points.forEach(other => {
      if (point === other) {
        return;
      }

      const d = distance(point, other);
      if (d < CONNECT_DISTANCE) {
        drawLine(point, other, d);
      }
    });
  });
};

loop();
