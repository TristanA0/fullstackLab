import React from 'react';
import * as d3 from 'd3';
import './style.css';

class ChartBar extends React.Component {
    componentDidMount() {
      if(this.props.isLoaded) {
        this.draw();
      }

      if(this.props.error) {
        d3.select("#graph-squaremeter").html("Error while request api");
      }

    }

    componentDidUpdate() {
      if(this.props.isLoaded) {
        this.draw();
      }

      if(this.props.error) {
        d3.select("#graph-squaremeter").html("Error while request api");
      }
    }

    draw() {
      let data = this.props.salesInterval;
      console.log(data.length);

      d3.select("#graph-chartbar").html("");
      d3.select("#tooltip-chartbar").html("");

      var margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;


      // set the ranges
      var x = d3.scaleBand()
                .range([0, width])
                .padding(0.1);
      var y = d3.scaleLinear()
                .range([height, 0]);






      var xAxis = d3.axisBottom()
        .scale(x);

      var yAxis = d3.axisLeft()
        .scale(y);

      // append the svg object to the body of the page
      // append a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select("#graph-chartbar").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      const div = d3.select("#tooltip-chartbar").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);


      // format the data
      data.forEach(function(d) {
        d.value = +d.value;
      });

      // Scale the range of the data in the domains
      //if(data.length <= 10 ) {
        x.domain(data.map(function(d) { return d.date; }));
      //}
      y.domain([0, d3.max(data, function(d) { return d.value; })]);

      // append the rectangles for the bar chart
      svg.selectAll(".bar")
          .data(data)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.date); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); })
          .style("fill", "#341EBF")
          .on("mouseover", function(d) {
              div.transition()
                  .duration(200)
                  .style("opacity", .9);
              div.html("Date : " + d.date)
                  .style("left", (d3.event.pageX + 10) + "px")
                  .style("top", (d3.event.pageY - 50) + "px");
          })
          .on("mouseout", function(d) {
              div.transition()
                  .duration(500)
                  .style("opacity", 0);
          });

      // add the x Axis
      if(data.length <= 10 ) {
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
      }

      // add the y Axis
      svg.append("g")
          .call(yAxis);



    }

    render(){
      return (
          <div>
            <div id="tooltip-chartbar"> </div>
            <div id="graph-chartbar"><p>Loading...</p></div>
          </div>
      )
    }
  }

  export default ChartBar;
