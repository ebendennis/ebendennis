var margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var x = d3.scaleLinear()
  .range([0, width]);

var y = d3.scaleLinear()
  .range([height, 0]);

var color = d3.scaleSequential(d3.interpolateMagma).domain([6,1]);

// Define the div for the tooltip
var div3 = d3.select("#svg-container3").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

var svg3 = d3.select("#svg-container3").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Container for the gradients
  var defs = svg.append("defs");

  //Filter for the outside glow
  var filter = defs.append("filter")
    .attr("id","glow");
  filter.append("feGaussianBlur")
    .attr("stdDeviation","5")
    .attr("result","coloredBlur");
  var feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode")
    .attr("in","coloredBlur");
  feMerge.append("feMergeNode")
    .attr("in","SourceGraphic");

  // Call csv and add points
d3.csv("../../../assets/js/top6data.csv", function(error, data) {
if (error) throw error;

data.forEach(function(d) {
  d.week = +d.week;
  d.points = +d.points;
});

x.domain([1,38]);
y.domain(d3.extent(data, function(d) { return d.points; })).nice();

 var nestData = d3.nest()
    .key(function(d) { return d.position; })
    .key(function(d) { return +d.week; })
    .rollup(function(values) { return {
      avg: d3.mean(values, function(d) {return +d.points; }),
      avgWeek: d3.mean(values, function(d) {return +d.week; })
      };
    })
    .entries(data);

           //Draw line

           var subjectPath = d3.line()
             .x(function(d) {
               return x(d.value.avgWeek);
               })
             .y(function(d) {
               return y(d.value.avg);
               })

           svg3.selectAll(".subject-group")
             .data(nestData)
             .enter().append('g')
             .attr('class', 'subject-group')
             .append('path')
             .style("stroke", function(d) { return color(d.key); })
             .style("stroke-opacity", .5)
             .style("fill", "none")
             // Pass the second level of the nested array to subjectPath to generate x/y co-ords
             .attr("d",function(d) {return subjectPath(d.values);});

svg3.selectAll(".dot")
    .data(data)
  .enter().append("circle")
    .attr("class", "dot")
    .attr("r", 3.5)
    .attr("cx", function(d) { return x(d.week); })
    .attr("cy", function(d) { return y(d.points); })
    .style("fill", function(d) { return color(d.position); })
    .style("stroke", function(d) { return color(d.position); })
    .style("fill-opacity", function(d) {if (d.season == "16-17") {return 1;} else {return 0;}; })
    .on("mouseover", function(d) {
        div3.transition()
             .duration(200)
             .style("opacity", .9);
        div3.html("Position " + d.position + "<br/>" + d.season + ": " + d.points)
             .style("left", (d3.event.pageX + 10) + "px")
             .style("top", (d3.event.pageY - 10) + "px");
    })
    .on("mouseout", function(d) {
        div3.transition()
             .duration(500)
             .style("opacity", 0);
    });

    // Add the X Axis
    svg3.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSizeInner(-height).tickPadding(10).tickSizeOuter(0))
          .append("text")
            .attr("class", "label2")
            .attr("x", function(d) {return (width - 5);})
            .attr("y", -6)
            .style("text-anchor", "end")
            .text("Week");

    // Add the Y Axis
        svg3.append("g")
            .call(d3.axisLeft(y).tickSizeInner(-width).tickPadding(5).tickSizeOuter(0))
          .append("text")
            .attr("class", "label2")
            .attr("transform", "rotate(-90)")
            .attr("x", -5)
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Points");

  d3.selectAll(".subject-group")
    .style("filter", "url(#glow)");

      function type(d) {
        d.value = +d.value;
        return d;
      }

});

  d3.selectAll("[name=v]").on("change", function() {
  var selected = this.value;
  opacity = this.checked ? 1 : 0;

  svg3.selectAll(".dot")
  .filter(function(d) {return selected == d.position;})
  .style("opacity", opacity);

  svg3.selectAll(".subject-group")
  .filter(function(d) {return selected == d.key;})
  .style("opacity", opacity);
  });
