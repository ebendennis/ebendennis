var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

// Define the div for the tooltip
var div = d3.select("#svg-container").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3.select("#svg-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("../../../assets/js/seasonData.csv", function(error, data) {
  if (error) throw error;

  x.domain([1,42]);
  y.domain([0,90]);

     var nestData = d3.nest()
      .key(function(d) { return +d.week; })
      .rollup(function(values) { return {
        first: d3.quantile(values.map(function(d) { return +d.points;}).sort(d3.ascending),.20),
        avg: d3.mean(values, function(d) {return +d.points; }),
        last: d3.quantile(values.map(function(d) { return +d.points;}).sort(d3.ascending),.80),
        avgWeek: d3.mean(values, function(d) {return +d.week; })
      	};
      })
      .entries(data);
console.log(nestData);
             //Draw line

             var subjectPath = d3.line()
               .x(function(d) {
                 return x(d.value.avgWeek);
                 })
               .y(function(d) {
                 return y(d.value.avg);
                 })

             var area = d3.area()
                .x(function(d) { return x(d.value.avgWeek); })
                .y0(function(d) { return y(d.value.first); })
                .y1(function(d) { return y(d.value.last); });

  					svg.append('path')
  						 .style("fill", "rgba(44,62,80,.1)")
               // Pass the second level of the nested array to subjectPath to generate x/y co-ords
               .attr("d", area(nestData));


             svg.append('path')
             	 .style("stroke", "rgba(44,62,80,.25)")
  						 .style("fill", "none")
               // Pass the second level of the nested array to subjectPath to generate x/y co-ords
               .attr("d", subjectPath(nestData));

});

d3.csv("../../../assets/js/seasonData.csv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.week = +d.week;
    d.points = +d.points;
  });

  svg.selectAll(".dot2")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot2")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.week); })
      .attr("cy", function(d) { return y(d.points); })
      .style("fill", function(d) {if (d.season == "16-17") {return "#e74c3c";} else {return "rgba(0,0,0,0)";}; })
  		.on("mouseover", function(d) {
          div.transition()
               .duration(200)
               .style("opacity", .9);
          div.html("Week " + d.week + "<br/>" + d.season + ": " + d.points)
               .style("left", (d3.event.pageX + 10) + "px")
               .style("top", (d3.event.pageY - 10) + "px");
      })
      .on("mouseout", function(d) {
          div.transition()
               .duration(500)
               .style("opacity", 0);
      });

      // Add the X Axis
      svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x).tickSizeInner(-height).tickPadding(10).tickSizeOuter(0))
            .append("text")
              .attr("class", "label")
              .attr("x", function(d) {return (width - 5);})
              .attr("y", -6)
              .style("text-anchor", "end")
              .text("Week");

      // Add the Y Axis
          svg.append("g")
              .call(d3.axisLeft(y).tickSizeInner(-width).tickPadding(5).tickSizeOuter(0))
            .append("text")
              .attr("class", "label")
              .attr("transform", "rotate(-90)")
              .attr("x", -5)
              .attr("y", 5)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Points");

        function type(d) {
          d.value = +d.value;
          return d;
        }

});