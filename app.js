const width = 600;
const height = 500;

const svg = d3
  .select("#mycanvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const g = svg
  .append("g")
  .attr("transform", `translate(${width / 2} ${height / 2})`);

const renderStar = (id, moveclip, rotateStar) => {
  const mask1r = g.append("g");
  mask1r
    .append("path")
    .data([null])
    .join("path")
    .attr("d", (d) => d3.symbol(d3.symbols[4], 30000)())
    .attr("transform", `rotate(${-rotateStar})`)
    .attr("fill", "black")
    .attr("clip-path", `url(#${id})`);

  mask1r
    .append("clipPath")
    .attr("id", id)
    .selectAll("rect")
    .data(d3.range(50))
    .join("rect")
    .attr("width", 3.78)
    .attr("height", 350)
    .attr("x", (d) => d * 22.68 - 3.78 - width / 2 / 2 + moveclip)
    .attr("y", -width / 2 / 2 -25)
    .attr("fill", "white")
    .attr("transform", `rotate(${rotateStar})`);
};

let rotateStar = 0;
let moveclip = 0;

// width determine by totalframe eg: 6 star frame width = 0.1cm(3.78px) and maingrid width = o.5cm(18.90px)

for (let frame = 0; frame < 6; frame++) {
  if (frame === 1) {
    rotateStar = 60;
  }
  renderStar("frame" + frame, moveclip, rotateStar);
  rotateStar = rotateStar + 60;
  moveclip = moveclip + 3.78;
}

  let gridMovement = -400

svg
  .append("g")
  .attr("id", "maingrid")
  .attr("transform", `translate(${gridMovement} 0)`)
  .attr("width", width)
  .attr("height", height)
  .selectAll("rect")
  .data(d3.range(22))
  .join("rect")
  .attr("x", (d) => d * 22.68 - 3.78)
  .attr("width", 18.9)
  .attr("height", height)
  .attr("fill", "black");


let moveleft = false;

setInterval(() => {
  if (gridMovement === -300 ) {
    moveleft = false;
  } else if (gridMovement === 300) {
    moveleft = true;
  }
  if (moveleft === false) {
    gridMovement = gridMovement + 2;
  } else if (moveleft === true) {
    gridMovement = gridMovement - 2;
  }
  d3.select("#maingrid").attr("transform", `translate(${gridMovement} 0)`);
}, 50);


