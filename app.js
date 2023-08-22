const width = 600;
const height = 500;

const svg = d3
  .select("#mycanvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

let gridMovment = 0;

const renderMask = (selection, id, rotate, moveright) => {
  svg
    .append("g")
    .attr("transform", `translate(${moveright} 0)`)
    .attr("width", width)
    .attr("height", height)
    .selectAll("rect")
    .data(d3.range(22))
    .join("rect")
    .attr("x", (d) => (d == 0 ? d : d * 22.68 - 3.78))
    .attr("width", 3.78)
    .attr("height", height)
    .attr("fill", "black")
    .attr("mask", `url(#${id})`);
  const mask = selection.append("mask").attr("id", id);

  mask
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "black");
  const g = mask
    .append("g")
    .attr(
      "transform",
      `translate(${width / 2},${height / 2}) rotate(${rotate})`
    );

  g.selectAll("path")
    .data(d3.range(1))
    .join("path")
    .attr("d", (d) => d3.symbol(d3.symbols[4], 30000)())
    .attr("fill", "white");
};

let rotateStar = 0;
let moveright = 0;

//width determine by totalframe eg: 6 star frame width = 0.1cm(3.78px) and maingrid width = o.5cm(18.90px)

for (let frame = 0; frame < 6; frame++) {
  if (frame === 1) {
    rotateStar = 60;
  }
  svg.call(renderMask, "frame" + frame, rotateStar, moveright);
  rotateStar = rotateStar * 2;
  moveright = moveright + 3.78;
}

const g = svg
  .append("g")
  .attr("id", "maingrid")
  .attr("transform", `translate(${gridMovment} 0)`)
  .attr("width", width)
  .attr("height", height)
  .selectAll("rect")
  .data(d3.range(22))
  .join("rect")
  .attr("x", (d) => d * 22.68)
  .attr("width", 18.9)
  .attr("height", height)
  .attr("fill", "black")
  .attr("opacity", "1");

let moveleft = false;

setInterval(() => {
  if (gridMovment === 0) {
    moveleft = false;
  } else if (gridMovment === 100) {
    moveleft = true;
  }
  if (moveleft === false) {
    gridMovment = gridMovment + 1;
  } else if (moveleft === true) {
    gridMovment = gridMovment - 1;
  }
  d3.select("#maingrid").attr("transform", `translate(${gridMovment} 0)`);
}, 100);
