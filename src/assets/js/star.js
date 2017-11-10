/**
 * showRatingStars 显示评分星级
 * @param  {Object} myCanvas 画布对象
 * @param  {Number} rating   评分
 * @param  {Number} counts   star个数
 * @param  {Number} size     star大小
 * @param  {Object} style    star样式
 * Example: style = {
 *   borderColor:"#21DEEF",
 *   fillColor:"#21DEEF",
 *   spaceColor:"#FFFFFF"
 * }
 * @return none
 */
function showRatingStars(myCanvas, rating, counts, size, style) {

  // 检测rating与star数目是否合适
  if (rating > counts) {

    alert("Please set suitable rating and counts!");
    return;
  }

  // 检测大小设置是否合适
  if (myCanvas.offsetWidth < size * counts || myCanvas.offsetHeight < size) {

    alert("Please set suitable size and myCanvas' size!");
    return;
  }

  var context = myCanvas.getContext('2d');
  var xStart = rating * size;
  var yStart = 0;
  var xEnd = (Math.ceil(rating) + 1) * size;
  var yEnd = 0;
  var radius = size / 2;

  // 线性渐变，由左至右
  var linear = context.createLinearGradient(xStart, yStart, xEnd, yEnd);
  linear.addColorStop(0, style.fillColor);
  linear.addColorStop(0.01, style.spaceColor);
  linear.addColorStop(1, style.spaceColor);
  context.fillStyle = linear;

  // star边框颜色设置
  context.strokeStyle = style.borderColor;
  context.lineWidth = 1;

  // 绘制star的顶点坐标   
  var x = radius,
    y = 0;

  for (var i = 0; i < counts; i++) {

    // star绘制
    context.beginPath();
    var x1 = size * Math.sin(Math.PI / 10);
    var h1 = size * Math.cos(Math.PI / 10);
    var x2 = radius;
    var h2 = radius * Math.tan(Math.PI / 5);
    context.lineTo(x + x1, y + h1);
    context.lineTo(x - radius, y + h2);
    context.lineTo(x + radius, y + h2);
    context.lineTo(x - x1, y + h1);
    context.lineTo(x - x1, y + h1);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
    context.fill();
    x = (i + 1.5) * size;
    y = 0;
    context.moveTo(x, y);
  }
}

// 参数设置与函数调用
var size = 15;
var rating = 3.2;
var counts = 5;
var style = {
  borderColor: "#00b5ad",
  fillColor: "#00b5ad",
  spaceColor: "#fff"
};
var myCanvas = document.getElementById("myCanvas");

showRatingStars(myCanvas, rating, counts, size, style);